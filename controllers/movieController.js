// Import axios to make HTTP requests to the OMDb API
const axios = require('axios');

/**
 * Search for movies by title
 * This function handles the /api/search?title=moviename endpoint
 * It takes a movie title from the query parameters and searches the OMDb API
 */
const searchMovies = async (req, res) => {
  // Extract the title from query parameters
  // For example: /api/search?title=Matrix
  const { title } = req.query;

  // Check if title parameter was provided
  // If not, return a 400 Bad Request error
  if (!title) {
    return res.status(400).json({
      error: 'Title parameter is required'
    });
  }

  // Use try-catch to handle any errors that might occur during the API call
  try {
    // Make a GET request to the OMDb API
    // 's' parameter is for search by title
    // 'apikey' is our API key from the .env file
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        s: title,
        apikey: process.env.OMDB_API_KEY
      }
    });

    // Send the data back to the client
    // The OMDb API returns a JSON object with search results
    res.json(response.data);
  } catch (error) {
    // If something goes wrong with the API call, log it and send an error response
    console.error('Error searching movies:', error.message);
    res.status(500).json({
      error: 'Failed to search movies',
      message: error.message
    });
  }
};

/**
 * Get detailed information about a specific movie by its IMDb ID
 * This function handles the /api/movies/:id endpoint
 * For example: /api/movies/tt0133093 (The Matrix)
 */
const getMovieDetails = async (req, res) => {
  // Extract the movie ID from the route parameters
  // The :id in the route becomes available here
  const { id } = req.params;

  // Use try-catch to handle any errors that might occur during the API call
  try {
    // Make a GET request to the OMDb API
    // 'i' parameter is for search by IMDb ID
    // 'apikey' is our API key from the .env file
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        i: id,
        apikey: process.env.OMDB_API_KEY
      }
    });

    // Send the detailed movie data back to the client
    // This includes plot, actors, ratings, etc.
    res.json(response.data);
  } catch (error) {
    // If something goes wrong with the API call, log it and send an error response
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({
      error: 'Failed to fetch movie details',
      message: error.message
    });
  }
};

// Export both functions so they can be used in the routes file
module.exports = {
  searchMovies,
  getMovieDetails
};
