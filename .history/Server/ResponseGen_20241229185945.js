import { ModelApi, BaseUrl } from "../Secrets/Envs/Api.env";
import {cors, express, rateLimit  } from "./Middleware.js";
const baseURL = BaseUrl;
const apiKey = ModelApi;
const method = "POST";

const app = express();
const cors = cors();

app.use(express.json());
app.use(cors());
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);


app.post("/Mistral-Nemo-12B-Instruct-2407", async (req, res) => {
    
  const userresponse = req.body.message;

  try {
    const response = await fetch(baseURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "Mistral-Nemo-12B-Instruct-2407",
        messages: [
            {"role": "system", "content": Data},
            {"role": "user", "content": userresponse}
            ],
      }),
    });

    const data = await response.json();

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

app.post("/Mistral-Nemo-12B-Instruct-2407", async (req, res) => {
    const userresponse = req.body.message;
  
    try {
      const response = await fetch(baseURL, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "text",
          messages: [userresponse],
        }),
      });
  
      const data = await response.json();
  
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while processing the request" });
    }
  });
  
