import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import ShowCase from "./component/ShowCase";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthState from "./context/authContext/AuthState";

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
          <ShowCase />
        </Fragment>
      </Router>
    </AuthState>
  );
}

export default App;
