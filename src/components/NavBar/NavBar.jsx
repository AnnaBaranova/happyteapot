import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <>
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link to="/" class="nav-link active">
                  H A P P Y T E A P O T
                </Link>
              </li>
              &nbsp;&nbsp;&nbsp;
              <li class="nav-item">
                <Link to="/" class="nav-link active">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <ul class="navbar-nav ms-md-auto">
              <li class="nav-item">
                <Link to="/signup" class="nav-link">
                  <i className="fas fa-user"></i>SIGN UP
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/" class="nav-link">
                  <i className="fas fa-shopping-cart"></i>Cart
                </Link>
              </li>
            </ul>
            <form class="d-flex">
                        <input class="form-control me-sm-2" type="text" placeholder="Search"/>
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
