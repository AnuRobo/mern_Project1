import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "../header/header.css";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [menudisplay, setMenuDisplay] = useState(false);

  //   menu toggler
  const toggleBtnState = () => {
    if (toggleBtn && menudisplay) {
      setToggleBtn(false);
      setMenuDisplay(false);
    } else {
      setToggleBtn(true);
      setMenuDisplay(true);
    }
  };

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <Link className="navitem" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navitem" to="/aboutme">
              AboutMe
            </Link>
          </li>
          <li>
            <Link className="navitem" to="/contact">
              Contact Us
            </Link>
          </li>

          <li>
            <Link className="navitem" to="/logout">
              Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link className="navitem" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navitem" to="/aboutme">
              AboutMe
            </Link>
          </li>
          <li>
            <Link className="navitem" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="navitem" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="navitem" to="/register">
              Register
            </Link>
          </li>
        </>
      );
    }
  };
  //   menu height when resolution is 680px
  // const menuDisplayState = () => {
  //   if (toggleBtn) {
  //     setToggleBtn(false);
  //   } else {
  //     setToggleBtn(true);
  //   }
  // };

  return (
    <header className="navheader flex">
      <nav className="navbar flex screenwidth">
        <Link className="navlogo flex" to="/">
          <div className="outerCircle">
            <div className="innerCircle"></div>
          </div>
          <h1 className="navlogoHeading">
            <span>anu</span>
            <span>robo</span>
          </h1>
        </Link>

        <div
          className={`menu-toggle ${toggleBtn ? "is-active" : " "}`}
          id="mobile-menu"
          onClick={toggleBtnState}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navlist flex ${menudisplay ? "active" : " "}`}>
          <RenderMenu />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

/**
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
 */
