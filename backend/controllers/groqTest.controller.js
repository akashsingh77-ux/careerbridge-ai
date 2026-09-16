import groq from "../utils/groq.js";

export const testGroq = async (req, res) => {
    try {
        const result = await groq.chat.completions.create({
           model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: "Say hello in one sentence.",
                },
            ],
        });

        return res.status(200).json({
            message: result.choices[0].message.content,
            success: true,
        });
    } catch (error) {
        console.log("GROQ TEST ERROR:", error);

        return res.status(500).json({
            message: "Groq test failed.",
            success: false,
        });
    }
};