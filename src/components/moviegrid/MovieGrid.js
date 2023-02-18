import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieGrid.css";

const API_KEY = `ac9520092f0240763841215ba5232cef`;
const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;

const MovieGrid = ({ movies }) => {
  return (
    <div
    
      className="movie-grid"
      style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" , paddingTop:"30px"}}
    >
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`}>
        <div
          key={movie.id}
          className="movie-poster grids"
          style={{ padding: "20px" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        </Link>
      ))}
    </div>
  );
};

const MoviePagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="movie-pagination">
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
      )}
      {currentPage} of {totalPages}
      {currentPage < totalPages && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

const MoviesHome = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}${currentPage}`);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };
    fetchData();
  }, [currentPage]);

  return (

    <div className="moviecon container ">
      <h3 class= "Top ">Top Rated Movies Of All Time</h3>
      <MovieGrid movies={movies} />
      <MoviePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MoviesHome;
