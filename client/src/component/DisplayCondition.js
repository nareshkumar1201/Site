import React, { useEffect } from "react";
import AuthContext from "../context/authContext/AuthContext";
import ShowCase from "./ShowCase";
import { Switch, Route } from "react-router-dom";
import Home from "./Dashbord/Home";
import PrivateRoute from "./pvtRoute/PrivateRoute";
const displayCondition = () => {
  const { isAuthenticate } = AuthContext;
  console.log(isAuthenticate);

  useEffect(() => {
    console.log(isAuthenticate);
  }, [isAuthenticate]);

  return isAuthenticate ? (
    <ShowCase />
  ) : (
    <Switch>
      <PrivateRoute Route exact path="/" component={Home} />
    </Switch>
  );
};

export default displayCondition;
