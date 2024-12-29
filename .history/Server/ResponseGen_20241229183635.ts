import { ModelApi, BaseUrl } from "../Secrets/Envs/Api.env"
const baseURL = BaseUrl;
const apiKey = ModelApi;
const method = "POST";

fetch(baseURL, {
    method: method,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({ prompt: "Hello, how are you?" })
}

)
