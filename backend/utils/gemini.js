import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

console.log(
    "GEMINI KEY EXISTS:",
    !!process.env.GEMINI_API_KEY
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export default ai;