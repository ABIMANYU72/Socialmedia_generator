require('dotenv').config();
const axios = require('axios');

const unsplashClient = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${process.env.ACCESS_TOKEN}`
    }
});

// Function to fetch images based on a specific prompt
async function getImageByPrompt(prompt) {
    try {
        const response = await unsplashClient.get('/search/photos', {
            params: {
                query: prompt,  // Pass the search term (prompt) here
                per_page: 1,     // Number of images to fetch
                orientation: 'landscape', // Optional: 'landscape', 'portrait', or 'squarish'
            }
        });

        // Return the first image from the search results
        if (response.data.results.length > 0) {
            return response.data.results[0].urls.regular; // URL of the image
        } else {
            throw new Error('No images found for the prompt');
        }

    } catch (error) {
        console.error(error);
    }
}

// Example usage of the getImageByPrompt function
(async () => {
    const prompt = 'gaming laptop';  // Example prompt (can be dynamic)
    const image = await getImageByPrompt(prompt);
    console.log('Image URL:', image);
})();
