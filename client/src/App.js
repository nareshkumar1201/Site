import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import ShowCase from "./component/ShowCase";
import Home from "./component/Home";
// import SignIn from "./component/SignIn";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthState from "./context/authContext/AuthState";
import PrivateRoute from "./component/pvtRoute/PrivateRoute";
import setToken from "./headerToken/setToken";
import AlertState from "./context/alertContext/AlertState";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <ShowCase />
            <Switch>
              <PrivateRoute Route exact path="/" component={Home} />
            </Switch>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
