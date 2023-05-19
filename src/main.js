import express, { json } from "express";
import { askAi } from "./controllers/ai";

const app = express();
const PORT = 3000;

app.use(json());

app.get("/professor", async (req, res) => {
    const { prompt } = req.query;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
    }
    const response = await askAi(prompt);
    res.json({ response });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
