const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const database = require('../database'); 

// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate user credentials and generate JWT token
    const user = await database.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (user.rows.length === 1) {
      const secretKey = '343270';
      const token = jwt.sign({ username }, secretKey);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//User registration route 
//path: localhost:3001/auth/register
router.post('/register', async (req, res) => {
  console.log("register handler reached")
  try {
    const { username, password } = req.body;
    console.log("username, password:", username, password)
    // Check if the username already exists
    const existingUser = await database.query('SELECT * FROM users WHERE username = $1', [username]);
    console.log("existingUser:", existingUser);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // If the username is unique, insert the new user into the database
    await database.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);

    // generate a JWT token and send it back to the client
    const secretKey = '343270'; 
    const token = jwt.sign({ username }, secretKey);
    
    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
