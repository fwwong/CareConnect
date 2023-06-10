const axios = require('axios');

const url = 'https://v4-0-dot-livitay.appspot.com/graphql';
const apiKey = '9677bbd3-4b5b-4a2f-a085-201771d6ad9c';
const headers =
// setting the headers for the API call
{
    "apikey": "9677bbd3-4b5b-4a2f-a085-201771d6ad9c"
};

async function makeSanctuaryAPIRequest(sequelizeQuery) {
    const query =
    // setting the data for the API call
    `query {
  getPosts(sequelizeQuery: {
    where: "{\"$or\":{\"title\":{\"$iLike\":\"%start the day%\"},\"description\":{\"$iLike\":\"%start the day%\"}}}",
    include: "[{\"association\":\"postParent\",\"where\":{\"category\":{\"$overlap\":[\"meditation_anxiety\",\"meditation_bodyConfidence\",\"meditation_breathwork\",\"meditation_focus\",\"meditation_gong\",\"meditation_grief\",\"meditation_kids\",\"meditation_morning\",\"meditation_parental\",\"meditation_sexualHealth\",\"meditation_sleep\",\"meditation_soundscapes\",\"meditation_womensHealth\"]}}}]"
  }) {
    id
    title
    description
    mediaFileDetailsList {
      file {
        url
      }
    }
  }
}
`;
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
                    sequelizeQuery: sequelizeQuery
                    // "sequelizeQuery": {
                    //     "where": "{\"$or\":[{\"title\":{\"$iLike\":\"%Start%\"}},{\"description\":{\"$iLike\":\"%Start%\"}}]}"
                    // }
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




