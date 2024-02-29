const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getJson } = require("serpapi");

// Define your SerpAPI API key
const serpApiKey = 'e1506cd90c3d305e5b45a8f982011f9e002db3ebc75ce7504124725d2a21ef7d';
const tempImageUrl = 'https://i.pinimg.com/564x/5e/5d/57/5e5d5756efb28be3b29f6902a3429c46.jpg';

// Define routes for items
router.get('/', (req, res) => {
  // Implement logic to fetch and send items
  res.send('Get all items route');
});

router.post('/', (req, res) => {
  // Implement logic to add a new item
  res.send('Add new item route');
});

// New route for scanning items using Google Lens API through SerpAPI
router.get('/scan', async (req, res) => {
  try {
    //const { url, hl, country } = req.query; // Extract query parameters

    let response; 

    getJson({
      api_key: serpApiKey,
      engine: "google_lens",
      url: tempImageUrl,
    }, (json) => {
      console.log ('apiGetJson');
      console.log(json);
      response = json;
    });

    // Make a GET request to the SerpAPI Google Lens endpoint
    // const response = await axios.get('https://serpapi.com/search', {
    //   params: {
    //     engine: 'google_lens',
    //     api_key: serpApiKey, // Using the SerpAPI API key
    //     url, // URL of the image to perform the Google Lens search
    //     hl, // Language code for localization (optional)
    //     country, // Country code for localization (optional)
    //     // Add any other necessary parameters
    //   },
    // });

    // Extract relevant data from the response
    const searchData = response.data;

    // Extract search results if available
    const searchResults = searchData.searchresults || [];

    //response has a shopping_results property that is an array of items
    //ultimately, data will be extracted to just be this array
    //this is what we want to send back to the client
    //assume searchResults is the untransfromed array

    // Transform search results to include only required fields
    const transformedResults = searchResults.map(result => ({
      source: result.source,
      source_logo: result.source_logo,
      price: result.price,
      extracted_price: result.extracted_price,
      link: result.link,
      snippet: result.snippet
    }));

    // Send the transformed data back to the client
    res.json(transformedResults);
  } catch (error) {
    console.error('Error fetching data from Google Lens API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more item routes as needed

module.exports = router;
