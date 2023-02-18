import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import MovieDetail from "./components/moviedetail/MovieDetail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import WatchlistPage from "./components/watchlistpage/WatchlistPage";
import Searchresults from "./components/searchresults/Searchresults";
import Favourites from "./components/favourites/Favourites";
import WatchedPage from "./components/watchedpage/WatchedPage";
import Social from "./social/Social";
import ForgetPass from "./components/forgetpass/ForgetPass";
import ResetPass from "./components/resetpass/ResetPass";

function App() {
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:id" element={<Trailer />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/search/:query" element={<Searchresults />}></Route>
          <Route path="/watchlist" element={<WatchlistPage />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
          <Route path="/watched" element={<WatchedPage />}></Route>
          <Route path="/social" element={<Social />}></Route>
          <Route path="/reset_password/:token" element={<ResetPass />}></Route>
          <Route path="/ForgetPass" element={<ForgetPass />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
