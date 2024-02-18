const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
