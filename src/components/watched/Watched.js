import React, { useState, useEffect } from "react";
import axios from "axios";

const EyeIcon = (props) => {
  const userId = localStorage.getItem("userid");
  const movieId = localStorage.getItem("movieId");
  const [isGreen, setIsGreen] = useState("grey");
  const [isWatched, setIsWatched] = useState(false);
  const [watchedid, setWatchedId] = useState("");

  useEffect(() => {
    const fetchIsWatched = async () => {
      const result = await axios.get(
        `http://localhost:8080/movie/watched/${userId}/${movieId}`
      );
      console.log("Fetching watched....");
      setWatchedId(result.data.id);
      setIsWatched(result.data);
      setIsGreen(result.data ? "green" : "grey");
    };

    fetchIsWatched();
  }, []);

  const handleClick = async () => {
    if (isWatched) {
      // Call delete endpoint
      console.log(userId);
      console.log(movieId);
      await axios.delete(
        `http://localhost:8080/movie/watched/${userId}/${movieId}`
      );
    } else {
      // Call save endpoint
      await axios.post("http://localhost:8080/movie/watched", {
        movieId: movieId,
        userId: userId,
        fromDate: new Date(),
      });
    }
    setIsWatched(!isWatched);
    setIsGreen(isWatched ? "grey" : "green");
  };

  return (
    <i
      className="material-icons fa fa-eye"
      style={{ color: isGreen }}
      onClick={handleClick}
    />
  );
};

export default EyeIcon;
