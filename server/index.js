const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;
const serpApiKey = 'e1506cd90c3d305e5b45a8f982011f9e002db3ebc75ce7504124725d2a21ef7d';

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Include your routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

// SerpAPI integration
app.get('/search', async (req, res) => {
  try {
    // Example SerpAPI request
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        api_key: serpApiKey,
        q: 'your-search-query', // Replace with your search query
        // Add more parameters as needed based on the SerpAPI documentation
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('SerpAPI request failed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
