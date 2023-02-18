import React from "react";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Hero = ({ movies }) => {
  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{
                    "--img": `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                  }}
                >
                  <div className="movie-detail">
                    <Link
                      to={`/movie/${movie.id}`}
                      onClick={() => {
                        localStorage.setItem("movieId", movie.id);
                        localStorage.setItem("movieTitle", movie.title);
                      }}
                    >
                      <div className="movie-poster">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </div>
                    </Link>
                    <div className="movie-title">
                      <h3>{movie.title}</h3>
                    </div>
                    <div className="movie-buttons-container">
                      <Link to={`/Trailer/${movie.id}`}>
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
