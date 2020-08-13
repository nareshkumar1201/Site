import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";

// Note:  ...rest ->for passing any other component as props

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticate, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticate && !loading ? (
          <Redirect to="/signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
