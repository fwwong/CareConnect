var express = require('express');
router = express.Router();
const makeAPIRequest = require('./OpenAIcall');
const makeSanctuaryAPIRequest = require('./sanctuaryHealthAPIcall');



var persistentPromptResponses;

module.exports = function (app) {

    function createGPTPrompt(userPrompt) {

        GPTPrompt = `Give me a list of sites and descriptions in this format. The sites should provide more information on the prompt "${userPrompt}".

{ "sites": [{"url": url, "description": description} ,  "site": {"url": url, "description": description} ,  "site": {"url": url, "description": description}]  } etc.`

        return (GPTPrompt)
    }
    "title"
    function generateSearchConditions(string) {
        const words = string.split(" ");
        var longWords = words.filter(word => word.length > 3);
        const searchConditions = longWords.map(word => {
            return `{\\"title\\":{\\"$iLike\\":\\"%${word}%\\"}},{\\"description\\":{\\"$iLike\\":\\"%${word}%\\"}},`;
        }).join("");
        const finalObject = `"{\\"$or\\":[${searchConditions.slice(0, -1)}]}"`;
        return finalObject;
    }

    app.get('/', (req, res) => {
        // render splash page
        res.render('index');
    });

    app.get('/home', (req, res) => {
        //init persistent prompt list
        persistentPromptResponses = [];
        //debug for list of rendered responses
        persistentPromptResponses.push(
            { "type": "website", "url": "https://stackoverflow.com/questions/55551264/syntaxerror-missing-after-argument-list-in-while-compiling-ejs", "title": "Stackoverflow", "desc": "A Place for nerds who think a lot and shower very very seldomly" },
            { "type": "video", "url": "https://www.youtube.com/embed/w0SxvCScZ3Q", "title": "🥺🥺🥺", "desc": "All the patient care you could ever need" },
            { "type": "video", "url": "https://www.youtube.com/embed/qZfLduNfFig", "title": "😳😳😳", "desc": "A Bit of a Pick me up" },
            { "type": "video", "url": "https://www.youtube.com/embed/ut83JRoqOl0", "title": "😳🥺😳", "desc": "A kafka a day keeps the doctor away" });

        // render the home page
        res.render('home', { userPrompt: "", sanctuaryResponse: "", promptResponses: persistentPromptResponses });
    });

    // app.post('/submitPrompt', async (req, res) => {
    //     var userPrompt = req.body.prompt;
    //     console.log(userPrompt)
    // });

    async function handleSanctuaryQuery(userPrompt) {
        var searchTerms = generateSearchConditions(userPrompt);
        console.log(searchTerms)
        // return
        var sequelizeQuery = {
            "where": searchTerms
        }
        var sanctuaryResponse = await makeSanctuaryAPIRequest(sequelizeQuery);
        // console.log("sanctuaryResponse is: ", sanctuaryResponse)
        var sanctuaryObjects = sanctuaryResponse.data.getPosts
        // var filteredObjects = sanctuaryObjects.filter(object => object.mediaFileDetailsList.length > 0)
        var filteredObjects = []
        for (var i = 0; i < sanctuaryObjects.length; i++) {
            try {
                // if sanctuaryObjects[i].mediaFileDetailsList[0].file.url doesn't end in .mp4, continue
                if (sanctuaryObjects[i].mediaFileDetailsList[0].file.url.slice(-4) != ".mp4") {
                    continue
                }
                filteredObjects.push({
                    title: sanctuaryObjects[i].title,
                    description: sanctuaryObjects[i].description,
                    url: sanctuaryObjects[i].mediaFileDetailsList[0].file.url
                })
            }
            catch (error) {
                try {
                    if (sanctuaryObjects[i].mediaFileDetailsList[0].slice(-4) != ".mp4") {
                        continue
                    }
                    filteredObjects.push({
                        title: sanctuaryObjects[i].title,
                        description: sanctuaryObjects[i].description,
                        url: sanctuaryObjects[i].mediaFileDetailsList[0]
                    })
                }
                catch (error) {
                    console.log("error is: ", error)
                    continue
                }
                continue
            }

        }
        return filteredObjects
    }

    async function handleGPTQuery(userPrompt) {
        var GPTPrompt = await createGPTPrompt(userPrompt);
        var GPTResponse = await makeAPIRequest(GPTPrompt);
        // console.log("GPTResponse is: ", GPTResponse)
        var GPTParsed = JSON.parse(GPTResponse);
        var sitesList = GPTParsed.sites;
        console.log("sitesList is: ", sitesList)
        return sitesList
    }

    async function packageAndAddResponsesToRenderList(sitesList, sanctuaryVideos) {
        // process sequentially
        // links at the top first, videos at the end

        // TODO: refactor later as just all in one prompt res box
        sitesList.forEach(site => {
            persistentPromptResponses.push({ "type": "website", "url": site.url, "title": URL(site.url).hostname, "desc": site.description });
        })

        sanctuaryVideos.forEach(video => {
            persistentPromptResponses.push({ "type": "video", "url": video.url, "title": video.title, "desc": video.description });
        });

    }


    app.get('/', (req, res) => {
        // render the home page
        res.render('home', { userPrompt: "", sanctuaryResponse: "", sitesList: "", promptResponses: persistentPromptResponses });
    });

    app.post('/submitPrompt', async (req, res) => {
        var userPrompt = req.body.prompt;

        var sitesList = await handleGPTQuery(userPrompt);
        var sanctuaryVideos = await handleSanctuaryQuery(userPrompt);

        packageAndAddResponsesToRenderList(sitesList, sanctuaryVideos);
        res.render('home', { userPrompt: userPrompt, sanctuaryResponse: sanctuaryVideos, sitesList: sitesList, promptResponses: persistentPromptResponses }); //, sanctuaryResponse: sanctuaryResponse
    });
}