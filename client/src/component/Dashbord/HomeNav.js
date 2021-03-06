import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const HomeNav = () => {
  return (
    <Fragment>
      <div>
        <nav className="navbar-custom">
          <div className="nav-wrapper ">
            <a href="#!" className="brand-logo">
              {" "}
            </a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/Services">Services</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="#!">Item One</a>
          </li>
          <li>
            <a href="#!">Item Two</a>
          </li>
          <li>
            <a href="#!">Item Three</a>
          </li>
          <li>
            <a href="#!">Item Four</a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default HomeNav;
