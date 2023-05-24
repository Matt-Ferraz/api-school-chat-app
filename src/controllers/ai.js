import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPEN_AI_API_KEY;

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

export async function askAi(input) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: input,
            temperature: 1,
            max_tokens: 2048,
        });
        const answer = response.data.choices[0].text.trim();
        console.log(answer);
        return answer;
    } catch (error) {
        console.error("OpenAI API error:", error.response.data);
        return error;
    }
}
