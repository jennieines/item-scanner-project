const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getJson } = require("serpapi");

// Define your SerpAPI API key
const serpApiKey = 'e1506cd90c3d305e5b45a8f982011f9e002db3ebc75ce7504124725d2a21ef7d';

router.get('/', (req, res) => {
  res.send('Get all items route');
});

router.post('/', (req, res) => {
  res.send('Add new item route');
});

// New route for scanning items using Google Lens API through SerpAPI
router.get('/scan', async (req, res) => {
  try {
    const { url } = req.query; 

    // request to SerpAPI Google Lens endpoint
    getJson({
      api_key: serpApiKey,
      engine: "google_lens",
      url: url,
    }, (response) => {

//turns out no shopping_results, but visual_matches is a list of 
//objects, some of which have a price object. your shoppingResults 
//array can just be the filtered out results that have prices

      console.log("reponse", response);
      console.log("response.shopping_results", response["shopping_results"]);

      const shoppingResults = response?.knowledge_graph?.[0]?.shopping_results || [];

      const transformedResults = shoppingResults.map(result => ({
        source: result.source,
        source_logo: result.source_logo,
        price: result.price,
        extracted_price: result.extracted_price,
        link: result.link,
        snippet: result.snippet
      }));

    
    // Send the transformed data back to the client
    res.json(transformedResults);
  });
  } catch (error) {
    console.error('Error fetching data from Google Lens API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
