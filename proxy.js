import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.VITE_MISTRAL_API_KEY;

app.post("/api/mistral", async (req, res) => {
  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur proxy Mistral", details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy Mistral lancé sur http://localhost:${PORT}`);
});