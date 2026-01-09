// Import Express Router to create route handlers
const express = require('express');

// Create a new router instance
// This lets us define routes separately from the main server file
const router = express.Router();

// Import the controller functions that handle the business logic
const { searchMovies, getMovieDetails } = require('../controllers/movieController');

/**
 * Route: GET /api/search
 * Purpose: Search for movies by title
 * Query Parameters: title (required)
 * Example: /api/search?title=Matrix
 */
router.get('/search', searchMovies);

/**
 * Route: GET /api/movies/:id
 * Purpose: Get detailed information about a specific movie
 * URL Parameters: id (IMDb ID)
 * Example: /api/movies/tt0133093
 */
router.get('/movies/:id', getMovieDetails);

// Export the router so it can be used in server.js
module.exports = router;
