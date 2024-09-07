const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");



const key = "AIzaSyCUTafZRXFJIcGwACm0_qvC63UPeAb72BU";
const genAI = new GoogleGenerativeAI(key);

async function generateResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

router.post("/chatbox", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "No message provided." });
    }
    const aiResponse = await generateResponse(userMessage);
    res.json({ response: aiResponse});
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

module.exports = router;

