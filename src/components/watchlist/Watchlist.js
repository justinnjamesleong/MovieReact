import React, { useState, useEffect } from "react";
import axios from "axios";

const EyeIcon = (props) => {
  const userId = localStorage.getItem("userid");
  const movieId = localStorage.getItem("movieId");
  const [isBlue, setIsBlue] = useState("grey");
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [watchlistid, setWatchlistId] = useState("");

  useEffect(() => {
    const fetchIsWatchlist = async () => {
      const result = await axios.get(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/watchlater/${userId}/${movieId}`
      );

      setWatchlistId(result.data.id);
      setIsWatchlist(result.data);
      setIsBlue(result.data ? "blue" : "grey");
    };

    fetchIsWatchlist();
  }, []);

  const handleClick = async () => {
    if (isWatchlist) {
      // Call delete endpoint
      await axios.delete(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/watchlater/${userId}/${movieId}`
      );
    } else {
      // Call save endpoint
      await axios.post("http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/movie/watchlater", {
        movieId: movieId,
        userId: userId,
        updatedate: new Date(),
      });
    }
    setIsWatchlist(!isWatchlist);
    setIsBlue(isWatchlist ? "grey" : "blue");
  };

  return (
    <i
      className="material-icons fa fa-list"
      style={{ color: isBlue }}
      onClick={handleClick}
    />
  );
};

export default EyeIcon;
