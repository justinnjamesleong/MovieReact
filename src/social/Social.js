import React from "react";
import Profilecard from "../components/profilecard/Profilecard";
import Follower from "../components/follower/Follower.js";
import Following from "../components/following/Following.js";
import UserList from "../components/userlist/UserList.js";
import SocialMovies from "../components/socialmovies/SocialMovies.js";
import "../social/Social.css";
const Social = () => {
  return (
    <div className="social-container">
      <div className="column">
        <Profilecard />
      </div>
      <div className="column" style={{ width: "500px" }}>
        <SocialMovies />
      </div>
      <div className="column">
        <Follower />
        <Following />
        <UserList />
      </div>
    </div>
  );
};

export default Social;
