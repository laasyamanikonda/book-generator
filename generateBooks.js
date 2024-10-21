require('dotenv').config(); // Add this line at the very top

const axios = require('axios');
const readline = require('readline');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateBookIdeas(prompt, retries = 5) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
                n: 1,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const bookIdeas = response.data.choices.map(choice => choice.message.content.trim());
        console.log("Generated Book Ideas:");
        bookIdeas.forEach((idea, index) => {
            console.log(`${index + 1}: ${idea}`);
        });
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            const waitTime = 2 ** (5 - retries) * 1000; // exp backoff(??? huh)
            console.log(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            await generateBookIdeas(prompt, retries - 1);
        } else {
            console.error("Error generating book ideas:", error);
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// prompt for user input
rl.question('Enter a genre or a specific book title for ideas: ', (input) => {
    generateBookIdeas(input);
    rl.close();
});
