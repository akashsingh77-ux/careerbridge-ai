import ai from "./gemini.js";
import groq from "./groq.js";

const GROQ_MODEL = "openai/gpt-oss-20b";

export const generateAIContent = async (prompt) => {
    try {
        console.log("AI PROVIDER: Trying Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
        });

        console.log("AI PROVIDER: Gemini succeeded.");

        return response.text;
    } catch (geminiError) {
        console.log("GEMINI FAILED. Switching to Groq...");
        console.log(
            "GEMINI ERROR:",
            geminiError?.message || geminiError
        );

        try {
            console.log("AI PROVIDER: Trying Groq...");

            const response =
                await groq.chat.completions.create({
                    model: GROQ_MODEL,
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    response_format: {
                        type: "json_object",
                    },
                    include_reasoning: false,
                });

            const text =
                response.choices[0]?.message?.content;

            if (!text) {
                throw new Error(
                    "Groq returned an empty response."
                );
            }

            console.log("AI PROVIDER: Groq succeeded.");

            return text;
        } catch (groqError) {
            console.log(
                "GROQ FALLBACK FAILED:",
                groqError?.message || groqError
            );

            const error = new Error(
                "Both Gemini and Groq AI providers failed."
            );

            error.status =
                groqError?.status ||
                geminiError?.status;

            error.geminiError = geminiError;
            error.groqError = groqError;

            throw error;
        }
    }
};