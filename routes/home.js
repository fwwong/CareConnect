var express = require('express');
router = express.Router();
const makeAPIRequest = require('./OpenAIcall');


module.exports = function (app) {

    function createGPTPrompt(userPrompt){
        return (userPrompt)
    }

    app.get('/', (req, res) => {
        // render the home page
        res.render('home', {gptPrompt: false});
    });

    app.post('/submitPrompt', async (req, res) => {
        var userPrompt = req.body.prompt;
        console.log(userPrompt)
        return
        // modify the prompt to be used in the API call
        var fullPrompt = createGPTPrompt(userPrompt);
        var gptResponse = await makeAPIRequest(fullPrompt);
        res.render('home', {gptPrompt: gptResponse})
    });
};