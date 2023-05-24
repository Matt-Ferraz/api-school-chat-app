import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { parse } from "dotenv";
dotenv.config();

const apiKey = process.env.OPEN_AI_API_KEY;

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

export async function askAi(input) {
    input = `${input}. Return response in this format \n {"question": "Por que a galinha atravessou a rua", "response": "para chegar do outro lado"}`;
    try {
        await openai
            .createCompletion({
                model: "text-davinci-003",
                prompt: input,
                temperature: 1,
                max_tokens: 2000,
            })
            .then((res) => {
                const answer = res.data.choices[0].text.trim();
                return answer;
            });
    } catch (error) {
        console.error("OpenAI API error:", error);
        if (error.toJSON().status > 500 && error.toJSON().status < 600)
            return console.log(error);
        return error;
    }
}
