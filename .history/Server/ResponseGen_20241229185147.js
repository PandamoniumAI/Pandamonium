import { ModelApi, BaseUrl } from "../Secrets/Envs/Api.env";

const baseURL = BaseUrl;
const apiKey = ModelApi;
const method = "POST";

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
  
