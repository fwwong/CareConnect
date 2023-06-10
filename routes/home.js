var express = require('express');
router = express.Router();
const makeAPIRequest = require('./OpenAIcall');
const makeSanctuaryAPIRequest = require('./sanctuaryHealthAPIcall');


module.exports = function (app) {

    function createGPTPrompt(userPrompt){
        return (userPrompt)
    }

    function createSanctuaryQueryVariables(userPrompt){
        return (userPrompt)
    }

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
        // render the home page
        res.render('home', { gptPrompt: false, userPrompt: "", sanctuaryResponse: ""});
    });

    app.post('/submitPrompt', async (req, res) => {
        var userPrompt = req.body.prompt;
        console.log(userPrompt)
        var searchTerms = generateSearchConditions(userPrompt);
        console.log(searchTerms)
        // return
        var sequelizeQuery = {
            "where": searchTerms
        }

        // sequelizeQuery = JSON.parse(sequelizeQuery);


        var sanctuaryResponse = await makeSanctuaryAPIRequest(sequelizeQuery);
        // console.log("sanctuaryResponse is: ", sanctuaryResponse)
        var sanctuaryObjects = sanctuaryResponse.data.getPosts
        console.log("sanctuaryObjects is: ", sanctuaryObjects)
        // modify the prompt to be used in the API call
        // var fullPrompt = createGPTPrompt(userPrompt);
        // var gptResponse = await makeAPIRequest(fullPrompt);
        res.render('home', { gptPrompt: userPrompt, userPrompt: userPrompt, sanctuaryResponse: JSON.stringify(sanctuaryResponse)}); //, sanctuaryResponse: sanctuaryResponse
    });
};