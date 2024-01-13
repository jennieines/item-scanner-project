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

app.use('/login', authRoutes);
app.use('/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
