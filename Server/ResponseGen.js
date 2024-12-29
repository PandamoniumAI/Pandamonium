import { ModelApi, BaseUrl } from "../Secrets/Envs/Api.env";
import {cors, express, rateLimit  } from "./Middleware.js";
const baseURL = BaseUrl;
const apiKey = ModelApi;
const method = "POST";
const app = express();
const cors = cors();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

const System = data.system;

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
            {"role": "system", "content": System},
            {"role": "user", "content": userresponse}
            ],
      }),
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

app.post('/generatetext', async (req, res) => {
    const { message, prompt } = req.body;

    if (!message && !prompt) {
        return res.status(400).json({ error: 'Message or prompt is required' });
    }

    const text = message || prompt;

    const url = 'https://serger.onrender.com/generate';

    try {
        new URL(url);
    } catch (e) {
        return res.status(500).json({
            error: 'Invalid URL',
            details: 'The URL for the generate service is not valid.'
        });
    }

    try {
        const response = await axios.post(url, {
            prompt: text
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Error connecting to the generate service',
                details: error.response?.data?.error || error.message
            });
        }
    }
});