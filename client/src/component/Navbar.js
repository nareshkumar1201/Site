import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <Fragment>
      <div>
        <nav className="navbar-custom">
          <div className="nav-wrapper ">
            <a href="#!" className="brand-logo">
              {" "}
            </a>
            <ul className="right">
              <li>
                <Link to="/signup" className="active">
                  SignUp
                </Link>
              </li>
              <li>
                <Link to="/signin">SignIn</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Navbar;
