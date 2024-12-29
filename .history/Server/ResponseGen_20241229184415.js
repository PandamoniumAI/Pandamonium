import { ModelApi, BaseUrl } from "../Secrets/Envs/Api.env"

const baseURL = BaseUrl;

const apiKey = ModelApi;

const method = "POST";
const userresponse = req.body.message;


const fetch(baseURL, {

    method: method,

    headers: {

        "Content-Type": "application/json",

        "Authorization": `Bearer ${apiKey}`

    },

    body: JSON.stringify({  "model": "text", "messages": [
        userresponse
      ]
    })

})

    .then(response => response.json())

    .then(data => {

        console.log(data);

    })

    .catch(error => {

        console.error("Error:", error);

});