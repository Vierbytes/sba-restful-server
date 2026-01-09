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

