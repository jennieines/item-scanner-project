const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getJson } = require("serpapi");
const pool = require('../database');

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
    }, async (response) => {
      const visualMatches = response?.visual_matches || [];

      const filteredResults = visualMatches.filter(result => result.price && result.price.value);

      if (filteredResults.length > 0) {
        const transformedResults = filteredResults.map(result => ({
          id: result.link,
          source: result.source,
          source_logo: result.source_icon, 
          price: result.price.value,
          link: result.link,
          thumbnail: result.thumbnail,
        }));

        // Insert the transformed data into the database
        for (const result of transformedResults) {
          await pool.query('INSERT INTO items (source, source_logo, price, link, thumbnail) VALUES ($1, $2, $3, $4, $5)', [result.source, result.source_logo, result.price, result.link, result.thumbnail]);
        }

        // Send the transformed data back to the client
        res.json(transformedResults);
      } else {
        res.status(404).json({ error: 'No visual matches found' });
      }
    });
  } catch (error) {
    console.error('Error fetching data from Google Lens API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
