const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Include your routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Serve the React app on any route that doesn't match an API route
app.use(express.static(path.join(__dirname, '../client/build')));  // Update this line

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));  // Update this line
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
