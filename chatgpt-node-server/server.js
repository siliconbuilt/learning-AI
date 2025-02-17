require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { OpenAI } = require("openai");
const { encoding_for_model } = require("tiktoken");

const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const model = "gpt-4o-mini";

const enc = encoding_for_model(model);

// Function to estimate token usage
function countTokens(text) {
  return enc.encode(text).length;
}

// API to get token count
app.post("/count-tokens", express.json(), (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }
  const tokenCount = countTokens(text);
  res.json({ text, tokens: tokenCount });
});

// API to get country data with token estimation
app.get("/get-countries", async (req, res) => {
  try {
    const prompt = `Hi!`;
    // Provide a JSON list of 5 countries with their name and capital:
    // `;
    const tokenCount = countTokens(prompt);

    console.log(`Prompt Token Count: ${tokenCount}`);

    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
      temperature: 0,
    });

    const responseText = response.choices[0]?.message?.content.trim();
    const responseTokenCount = countTokens(responseText);

    res.json({
      prompt_tokens: tokenCount,
      response_tokens: responseTokenCount,
      total_tokens: tokenCount + responseTokenCount,
      data: JSON.parse(responseText),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
