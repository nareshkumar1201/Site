import React, { useEffect, useContext, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import ShowCase from "./component/ShowCase";
import Home from "./component/Dashbord/Home";
// import SignIn from "./component/SignIn";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthState from "./context/authContext/AuthState";
import PrivateRoute from "./component/pvtRoute/PrivateRoute";
import setToken from "./headerToken/setToken";
import AlertState from "./context/alertContext/AlertState";
import AuthContext from "./context/authContext/AuthContext";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  const { isAuthenticate } = useContext(AuthContext);
  useEffect(() => {
    M.AutoInit();
    // console.log(isAuthenticate);
  });
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />

            {isAuthenticate ? (
              <ShowCase />
            ) : (
              <Switch>
                <PrivateRoute Route exact path="/" component={Home} />
              </Switch>
            )}
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
