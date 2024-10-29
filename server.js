const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve your HTML and JS from 'public' folder

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/recommendations', async (req, res) => {
    const input = req.body.input;
    const prompt = `Can you recommend some books based on the following genre or book title: "${input}"? Please only provide which themes are explored in each book, and how the book matches the input book/genre. Do not provide a synopsis of the books or characters`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 300,
                temperature: 0.5,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const bookRecommendations = response.data.choices.map(choice => choice.message.content.trim());
        res.json(bookRecommendations);
    } catch (error) {
        console.error("Error generating book recommendations:", error);
        res.status(500).send("Error generating recommendations");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
