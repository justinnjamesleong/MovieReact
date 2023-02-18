import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const avatar = localStorage.getItem("avatar");
  console.log(avatar);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <i class="fa fa-play-circle" aria-hidden="true"></i>
          ADProject
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {localStorage.getItem("isAuthenticated") === "true" && (
              <NavLink className="nav-link" to="">
                Hey there {localStorage.getItem("username")}!
              </NavLink>
            )}

            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {localStorage.getItem("isAuthenticated") === "true" && (
              <>
                <NavLink className="nav-link" to="/watchlist">
                  Watch List
                </NavLink>
                <NavLink className="nav-link" to="/favourites">
                  Favourites
                </NavLink>
                <NavLink className="nav-link" to="/watched">
                  Watched
                </NavLink>
                <NavLink className="nav-link" to="/social">
                  Social
                </NavLink>
              </>
            )}
          </Nav>
          <Searchbar />
          {localStorage.getItem("isAuthenticated") != "true" && (
            <Link to={`/login`}>
              <Button variant="outline-info" className=" me-2" to="/login">
                Login
              </Button>
            </Link>
          )}
          {localStorage.getItem("isAuthenticated") != "true" && (
            <Link to={`/register`}>
              <Button variant="outline-info" className="me-2" to="/register">
                Register
              </Button>
            </Link>
          )}
          {localStorage.getItem("isAuthenticated") === "true" && (
            <Button
              variant="outline-info"
              className="me-2"
              to="/"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
