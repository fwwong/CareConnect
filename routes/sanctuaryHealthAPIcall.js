const axios = require('axios');

const url = 'https://v4-0-dot-livitay.appspot.com/graphql';
const apiKey = '9677bbd3-4b5b-4a2f-a085-201771d6ad9c';
const headers =
// setting the headers for the API call
{
    "apikey": "9677bbd3-4b5b-4a2f-a085-201771d6ad9c"
};

async function makeSanctuaryAPIRequest(listOfWords) {
    try {
        const response = await fetch("https://v4-0-dot-livitay.appspot.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: "9677bbd3-4b5b-4a2f-a085-201771d6ad9c"
            },
            body: JSON.stringify({
                query: `query exampleOperation($sequelizeQuery: SequelizeQuery!) {
  getPosts(sequelizeQuery: $sequelizeQuery) {
    id
    title
    description
    mediaFileDetailsList {
      file {
        url
      }
    }
  }
}`,
                variables: {
                    // sequelizeQuery: sequelizeQuery
                    "sequelizeQuery": {
                        "where": `{\"$or\":[{\"title\":{\"$iLike\":\"%${listOfWords[0]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[1]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[1]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[1]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[2]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[2]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[3]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[3]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[4]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[4]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[5]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[5]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[6]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[6]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[7]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[7]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[8]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[8]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[9]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[9]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[10]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[10]}%\"}}, {\"title\":{\"$iLike\":\"%${listOfWords[11]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[11]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[12]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[12]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[13]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[13]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[14]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[14]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[15]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[15]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[16]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[16]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[17]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[17]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[18]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[18]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[19]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[19]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[20]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[20]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[21]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[21]}%\"}},{\"title\":{\"$iLike\":\"%${listOfWords[22]}%\"}},{\"description\":{\"$iLike\":\"%${listOfWords[22]}%\"}}]}`
                    }
                }
            })
        });
        const data = await response.json();
        // console.log("data returned:", data);
        return data; // Return the data object
    } catch (error) {
        console.log(error);
        return "couldn't get sanctuary data";
    }
    // console.log("data is: ", data);
}

module.exports = makeSanctuaryAPIRequest;




