import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../socialmovies/SocialMovies";
import "../movierecommender/MovieRecommender.css";
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

const MovieRecommender = ({ watchlist, watched, favourites }) => {
  const userid = localStorage.getItem("userid");

  const [recommendresults, setRecommedResults] = useState([]);
  const [favouriteresults, setFavouriteResults] = useState([]);
  const [lastMoviename, setLastMovieNameResults] = useState("");

  useEffect(() => {
    const fetchFavouriteResults = async () => {
      const response = await fetch(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/favourite/user/${userid}`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log(data);

      setFavouriteResults(data);
    };

    fetchFavouriteResults();
    console.log(favouriteresults.data);
  }, []);

  useEffect(() => {
    if (favouriteresults.length > 0) {
      const lastMovieName =
        favouriteresults.length === 1
          ? favouriteresults[0].title
          : favouriteresults[favouriteresults.length - 1].title;
      setLastMovieNameResults(lastMovieName);

      fetchRecommendations(lastMovieName);
    }
  }, [favouriteresults]);

  const getMovieDetails = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=ac9520092f0240763841215ba5232cef`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log(`Error fetching movie details for ID ${movieId}`);
      return null;
    }
  };

  const fetchRecommendations = async (movieName) => {
    if (!movieName) return;

    const response = await fetch("http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: movieName }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(response);
      console.log(data);

      if (!data.resultsRec || data.resultsRec.length === 0) {
        console.log(
          "Sorry, we couldn't find any recommendations for this movie."
        );
        return;
      }

      const recommendedMovies = [];

      for (let i = 0; i < 5; i++) {
        const title = data.resultsRec[i].title;
        console.log(data.resultsRec[i]);
        console.log(title);
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=ac9520092f0240763841215ba5232cef&query=${title}`;

        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        const movieId = searchData.results[0].id;
        console.log(movieId);
        const movieDetails = await getMovieDetails(movieId);
        console.log(movieDetails);

        recommendedMovies.push({
          id: movieId,
          title: movieDetails.title,
          posterPath: movieDetails.poster_path,
          overview: movieDetails.overview,
          releaseDate: movieDetails.release_date,
        });
      }

      setRecommedResults(recommendedMovies);
    } else {
      console.log("Error fetching recommendations");
    }
  };

  console.log(recommendresults[0]);
  return (
    <div>
      <h4>Because you favourited: {lastMoviename}</h4>
      <Slider {...settings}>
        {/* {favourites.map((movie) => (
            <div key={movie.id}>
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))} */}

        {recommendresults.slice(0, 5).map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
            key={movie.id}
          >
            <div
              className="movie-poster grids"
              style={{ height: "300px", width: "200px" }}
            >
              {movie.posterPath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
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

export default MovieRecommender;
