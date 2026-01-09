// Load environment variables first - this is important so we can access API keys
require('dotenv').config();

// Import express to create the server
const express = require('express');

// Import the movie routes we'll create
const movieRoutes = require('./routes/movieRoutes');

// Initialize the Express app
const app = express();

// Get the port from environment variables, or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
// This lets us handle JSON data sent from the client
app.use(express.json());

// Mount the movie routes under the /api prefix
// So all routes will be accessible at /api/...
app.use('/api', movieRoutes);

// Basic route to test if the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Movie Finder API is running!' });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
