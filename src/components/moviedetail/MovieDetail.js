import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../api/axiosConfig";
import "./MovieDetail.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Reviews from "../reviews/Reviews.js";
import MovieProvider from "../movieprovider/MovieProvider.js";
import Watched from "../watched/Watched.js";
import Watchlist from "../watchlist/Watchlist.js";

const MovieDetail = () => {
  let { id } = useParams();
  console.log(id);
  localStorage.setItem("movieId", id);
  const [movie, setMovie] = useState({});
  const [smovie, setsMovie] = useState({});
  const userId = localStorage.getItem("userid");

  const username = localStorage.getItem("username");

  const idString = id.toString();
  const [favouriteid, setFavouriteId] = useState("");

  console.log(id);
  const [isFavorited, setIsFavorited] = useState(false);
  const [color, setColor] = useState("grey");
  const accessToken = localStorage.getItem("accessToken");
  console.log(isFavorited);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=ac9520092f0240763841215ba5232cef`
      );
      setMovie(result.data);
      const mresult = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=ac9520092f0240763841215ba5232cef`
      );
      console.log(mresult.data);
      setsMovie(mresult.data);

      localStorage.setItem("movieTitle", mresult.data.title);
    };

    const fetchIsFavorited = async () => {
      const result = await axios.get(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/favourite/${userId}/${id}`
      );
      console.log("Fetching favourited.....");
      setFavouriteId(result.data.id);
      setIsFavorited(result.data);
      setColor(result.data ? "red" : "grey");
    };

    fetchData();
    fetchIsFavorited();
  }, []);

  const rdate = smovie.release_date;

  const handleClick = async () => {
    if (isFavorited) {
      // Call delete endpoint
      await axios.delete(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/favourite/${userId}/${id}`
      );
    } else {
      // Call save endpoint
      console.log(id);
      console.log(userId);
      console.log(new Date());
      await axios.post("http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/favourite", {
        movieId: id,
        userId: userId,
        fromDate: new Date(),
      });
    }
    setIsFavorited(!isFavorited);
    setColor(isFavorited ? "grey" : "red");
  };
  return (
    <div>
      <div class="d-flex">
        <div class="movie_card" id="bright">
          <div class="info_section">
            <div class="movie_header">
              <img
                class="locandina"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <h1>{movie.title}</h1>
              <h4>{rdate}</h4>
              <span class="minutes">{smovie.runtime} min</span>
              {smovie && smovie.genres
                ? smovie.genres.map((genre) => (
                    <p class="type" key={genre.id}>
                      {genre.name}
                    </p>
                  ))
                : null}
            </div>
            <br />
            <br />
            <div class="movie_desc">
              <p class="text">{movie.overview}</p>
            </div>

            <div class="movie_social">
              <ul>
                <li>
                  {localStorage.getItem("isAuthenticated") === "true" && (
                    <i class="material-icons">
                      <Watched
                        accessToken={accessToken}
                        id={id}
                        userId={userId}
                      />
                    </i>
                  )}
                </li>
                <li>
                  {localStorage.getItem("isAuthenticated") === "true" && (
                    <i
                      class="material-icons fa fa-heart"
                      onClick={handleClick}
                      style={{ color: color }}
                    ></i>
                  )}
                </li>
                <li>
                  {localStorage.getItem("isAuthenticated") === "true" && (
                    <i class="material-icons">
                      <Watchlist
                        accessToken={accessToken}
                        id={id}
                        userId={userId}
                      />
                    </i>
                  )}
                </li>
                <li>
                  <i class=" material-icons "></i>
                  <Link to={`/Trailer/${movie.id}`}>
                    <button class="glow-on-hover" type="button">
                      Watch Trailer
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="blur_back bright_back"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            paddingTop: "10%",
          }}
        >
          <MovieProvider />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
