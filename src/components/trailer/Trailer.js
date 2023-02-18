import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Trailer.css";
import { useState, useEffect } from "react";
import axios from "axios";

import React from "react";

const Trailer = () => {
  const { id } = useParams();

  console.log(id);
  const API_KEY = "ac9520092f0240763841215ba5232cef";
  const [youtubekey, setYoutubeKey] = useState("");
  async function getMovieTrailer(id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );

    const videos = result.data.results;
    const trailer = videos.find((video) => video.type === "Trailer");

    if (trailer) {
      return trailer.key;
    }

    return null;
  }

  getMovieTrailer(id).then((key) => {
    if (key) {
      console.log(`The YouTube key for the movie with ID ${id} is: ${key}`);
      setYoutubeKey(key);
    } else {
      console.log(`No trailer was found for the movie with ID ${id}`);
    }
  });

  return (
    <div className="react-player-container">
      {id != null ? (
        <ReactPlayer
          controls="true"
          playing={true}
          url={`https://www.youtube.com/watch?v=${youtubekey}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
};

export default Trailer;
