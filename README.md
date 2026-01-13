# Movie Finder API

A RESTful API server that acts as an intermediary between a front-end application and the OMDb (Open Movie Database) API. This API allows users to search for movies and retrieve detailed information about specific films.

## Features

- Search for movies by title
- Get detailed information about a specific movie using its IMDb ID
- Error handling for missing parameters and API failures
- Environment-based configuration for API keys

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OMDb API key (get one free at [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx))

## Installation

1. Clone or download this project

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDb API key:
```
OMDB_API_KEY=your_actual_api_key_here
PORT=3000
```

## Usage

Start the server:
```bash
node server.js
```

The server will start on port 3000 (or the port specified in your `.env` file).

## API Endpoints

### 1. Search Movies
Search for movies by title.

**Endpoint:** `GET /api/search`

**Query Parameters:**
- `title` (required) - The movie title to search for

**Example:**
```
GET http://localhost:3000/api/search?title=Matrix
```

**Response:**
```json
{
  "Search": [
    {
      "Title": "The Matrix",
      "Year": "1999",
      "imdbID": "tt0133093",
      "Type": "movie",
      "Poster": "..."
    }
  ],
  "totalResults": "5",
  "Response": "True"
}
```

### 2. Get Movie Details
Get detailed information about a specific movie using its IMDb ID.

**Endpoint:** `GET /api/movies/:id`

**URL Parameters:**
- `id` - The IMDb ID of the movie (e.g., tt0133093)

**Example:**
```
GET http://localhost:3000/api/movies/tt0133093
```

**Response:**
```json
{
  "Title": "The Matrix",
  "Year": "1999",
  "Rated": "R",
  "Released": "31 Mar 1999",
  "Runtime": "136 min",
  "Genre": "Action, Sci-Fi",
  "Director": "Lana Wachowski, Lilly Wachowski",
  "Plot": "...",
  "imdbRating": "8.7",
  "Response": "True"
}
```

## Project Structure

```
sba/
├── controllers/
│   └── movieController.js    # Business logic for handling requests
├── routes/
│   └── movieRoutes.js         # Route definitions
├── .env                       # Environment variables (not in git)
├── .gitignore                 # Git ignore file
├── package.json               # Project dependencies
├── server.js                  # Main entry point
└── README.md                  # This file
```

## Error Handling

The API includes error handling for:
- Missing required parameters (returns 400 Bad Request)
- API connection failures (returns 500 Internal Server Error)
- Invalid IMDb IDs or movie titles (handled by OMDb API response)

## Project Reflection

### What I Learned

Building this RESTful API taught me several important concepts about backend development:

**1. API Architecture and Separation of Concerns**
- I learned why it's important to separate routes and controllers into different files. The routes file (`movieRoutes.js`) handles the URL patterns and HTTP methods, while the controller (`movieController.js`) contains the actual business logic. This makes the code much easier to maintain and test.
- At first I was tempted to put everything in `server.js`, but organizing it this way helped me understand how real-world applications are structured.

**2. Environment Variables and Security**
- Using a `.env` file to store the API key was crucial for security. I learned that you should never hardcode sensitive information like API keys directly in your code because then anyone who sees the code (like on GitHub) could steal your credentials.
- The `dotenv` package made it easy to load these variables, and adding `.env` to `.gitignore` ensures it never gets committed to version control.

**3. RESTful API Design Principles**
- I learned about REST conventions: using GET requests for retrieving data, organizing endpoints logically (`/api/search` and `/api/movies/:id`), and returning proper HTTP status codes (200 for success, 400 for bad requests, 500 for server errors).
- Query parameters (like `?title=Matrix`) are great for search/filter operations, while route parameters (like `/movies/:id`) work well for accessing specific resources.

**4. Middleware and Request/Response Flow**
- Understanding how `express.json()` middleware works was interesting - it automatically parses incoming JSON data so we can use `req.body`.
- The request flows through middleware first, then to the router, then to the controller function, which sends a response back. This pipeline pattern is really common in web frameworks.

**5. Async/Await and Error Handling**
- Making external API calls requires async/await because we need to wait for the response before continuing. I got more comfortable with the try-catch pattern for handling errors that might occur during these operations.
- I learned it's important to log errors server-side for debugging while sending user-friendly messages to the client.

### Challenges I Faced

**Getting the API Key Working**
- Initially, I had trouble getting my OMDb API key to work. I realized I needed to activate it via the email they sent, and there's a delay before it becomes active. This taught me patience and the importance of reading documentation carefully.

**Understanding Route Parameters vs Query Parameters**
- I was confused at first about when to use `req.params.id` versus `req.query.title`. I learned that route parameters (`:id`) are part of the URL path and are good for identifying specific resources, while query parameters (`?title=something`) are better for optional filters or search criteria.

**Module Exports and Imports**
- Figuring out how to properly export functions from the controller and import them in routes took some trial and error. I learned about the difference between `module.exports = { functionName }` and destructuring when importing with `require()`.

### What I Would Do Differently Next Time

- **Add Input Validation**: I would add more thorough validation for the movie ID format to catch invalid inputs before making API calls.
- **Implement Caching**: To reduce API calls and improve performance, I could cache popular search results using a simple in-memory cache or Redis.
- **Add Rate Limiting**: To prevent abuse, I'd implement rate limiting to restrict how many requests a client can make in a given time period.
- **Better Error Messages**: I could provide more specific error messages based on different failure scenarios (network error vs. invalid API key vs. movie not found).
- **Add Tests**: Writing unit tests for the controller functions would help ensure the code works correctly and makes it safer to make changes later.

