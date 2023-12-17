// server.js
// Import the Express framework
const express = require('express');

// Import services
const serviceAuth = require('./services/service.auth/api');
const ServiceAuthTests = require('./services/service.auth/api.test');

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('/api/auth' , serviceAuth );
app.use('/test/api/auth', ServiceAuthTests );


// Start the server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// 