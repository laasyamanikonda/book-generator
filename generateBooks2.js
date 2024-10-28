require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log("OpenAI API Key:", OPENAI_API_KEY);

async function generateBookRecommendations(input, retries = 5) {
    // Modify the prompt to ask for book grecommendations
    const prompt = `Can you recommend some books based on the following genre or book title: "${input}"? Please only provide which themes are explored in each book, and how the book matches the input book/genre. Do not provide a synopsis of the books or characters`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 300, // Adjusted back to 100 if needed
                n: 1,
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
        console.log("Recommended Books:");
        bookRecommendations.forEach((recommendation, index) => {
            console.log(`${index + 1}: ${recommendation}`);
        });
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            const waitTime = 2 ** (5 - retries) * 1000; 
            console.log(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            await generateBookRecommendations(input, retries - 1);
        } else {
            console.error("Error generating book recommendations:", error);
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt for user input
rl.question('Enter a genre or a specific book title for recommendations: ', (input) => {
    generateBookRecommendations(input);
    rl.close();
});
