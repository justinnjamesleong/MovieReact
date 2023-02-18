import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TMDB_API_KEY = "ac9520092f0240763841215ba5232cef";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const Searchresults = (props) => {
  const { query } = useParams();
  console.log(query);
  const [results, setResults] = useState([]);

  const fetchResults = async (query) => {
    console.log(query);
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
    console.log(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();
    setResults(data.results);
    console.log(data);
    console.log(results);
  };

  useEffect(() => {
    if (query) {
      fetchResults(decodeURIComponent(query));
    }
  }, [query]);

  const SearchGrid = ({ results }) => {
    return (
      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          paddingTop: "30px",
        }}
      >
        {results.map((movie) => (
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
            <div
              key={movie.id}
              className="movie-poster grids"
              style={{ padding: "20px" }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div style={{ marginTop: "50%", fontSize: "20px" }}>
                <h2>{movie.title}</h2>
                <h4>No Image Available</h4>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="moviecon container ">
      <h3 class="Top ">Results for "{query}"</h3>
      <SearchGrid results={results} />
    </div>
  );
};

export default Searchresults;
