import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../socialmovies/SocialMovies";
import { Link } from "react-router-dom";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const SocialMovies = ({ watchlist, watched, favourites }) => {
  const userid = localStorage.getItem("userid");
  const [watchlistresults, setWatchListResults] = useState([]);
  const [watchedresults, setWatchedResults] = useState([]);
  const [favouriteresults, setFavouriteResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/watchlist/user/${userid}`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log(data);
      setWatchListResults(data);
      console.log(typeof data);
      console.log(data.results);
      console.log(typeof data.results);
    };

    const fetchWResults = async () => {
      const response = await fetch(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/watched/user/${userid}`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log(data);
      setWatchedResults(data);
      console.log(typeof data);
      console.log(data.results);
      console.log(typeof data.results);
    };

    const fetchFResults = async () => {
      const response = await fetch(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/favourite/user/${userid}`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log(data);
      setFavouriteResults(data);
      console.log(typeof data);
      console.log(data.results);
      console.log(typeof data.results);
    };
    fetchResults();
    fetchWResults();
    fetchFResults();
  }, []);
  return (
    <div>
      <h4>Watchlist</h4>
      <Slider {...settings}>
        {/* {watchlist.map((movie) => (
          <div key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))} */}

        {watchlistresults.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              key={movie.id}
              className="movie-poster grids"
              style={{ height: "150px", width: "150px" }}
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
      </Slider>

      <h4>Watched</h4>
      <Slider {...settings}>
        {/* {watched.map((movie) => (
          <div key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))} */}
        {watchedresults.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              key={movie.id}
              className="movie-poster grids"
              style={{ height: "150px", width: "150px" }}
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
      </Slider>

      <h4>Favourites</h4>
      <Slider {...settings}>
        {/* {favourites.map((movie) => (
          <div key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))} */}

        {favouriteresults.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              key={movie.id}
              className="movie-poster grids"
              style={{ height: "150px", width: "150px" }}
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
      </Slider>
    </div>
  );
};

export default SocialMovies;
