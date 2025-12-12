import dotenv from "dotenv";
dotenv.config(); // <-- load env first
const GEMINI_API_KEY = "AIzaSyA3F1Ai42MWGVlqghxsrpCOxRnpen2PmR4";

import { GoogleGenAI } from "@google/genai";


const getGeminiResponse = async (req, res) => {
    try {
        const { message } = req.body;
        const geminiApiKey = GEMINI_API_KEY;
        

        if (!message) {
            return res.status(400).json({ message: "Input is required" });
        }

        if (!geminiApiKey) {
            return res.status(400).json({ message: "GEMINI_API_KEY is missing. Add it to .env and restart." });
        }

        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        console.log(response.text)
        
        return res.status(200).json({ message: response.text });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export{
    getGeminiResponse
}