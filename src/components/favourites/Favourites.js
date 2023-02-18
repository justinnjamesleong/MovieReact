import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieRecommender from "../movierecommender/MovieRecommender";

const Favourites = () => {
  const token = localStorage.getItem("accessToken");
  const userid = localStorage.getItem("userid");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/favourite/user/${userid}`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log(data);
      setResults(data);
      console.log(typeof data);
      console.log(data.results);
      console.log(typeof data.results);
    };
    fetchResults();
  }, []);

  const FavouriteGrid = ({ results }) => {
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
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
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
    <div>
      <div className="moviecon container ">
        <h3 class="Top ">Favourites</h3>
        <FavouriteGrid results={results} />
      </div>
      <container>
        <div>
          <MovieRecommender />
        </div>
      </container>
    </div>
  );
};

export default Favourites;
