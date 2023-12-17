const express = require ('express');
const api_test = express.Router();
const actions = require('./actions');
const middleware = require('./middleware')

const sampleUser = {
    username: 'testUSER',
    password: '12345'
}

api_test.get('/' , ( req , res ) => {
    res.send('/')
});

// Route to generate a token
api_test.get('/hash', async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = await actions.hashPassword( password);
      res.json({ hashedPassword });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to test password hashing and comparison
api_test.post('/testhash', async (req, res) => {
    const password = req.body.password;

    console.log( password );
  
    if (!password) {
      return res.status(400).json({ error: 'Password is missing' });
    }
  
    try {
      const hashedPassword = await actions.hashPassword(password);
      const isMatch = await actions.comparePassword(password, hashedPassword);
  
      res.json({ isMatch });
    } 
    catch (error) {
      console.log( error );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to generate a token
api_test.post('/generatetoken', (req, res) => {
    try {
      const token = actions.generateToken(sampleUser);
      res.json({ token });
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to verify a token
api_test.post('/verifytoken', (req, res) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
  
    // Extract the token from the "Bearer" scheme if present
    const tokenParts = token.split(' ');
    const bearerToken = tokenParts.length === 2 ? tokenParts[1] : null;
  
    if (!bearerToken) {
      return res.status(401).json({ error: 'Invalid token format' });
    }
  
    const decoded = actions.verifyToken(bearerToken);
  
    if (decoded) {
      res.json({ data: decoded.data });
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

module.exports = api_test;