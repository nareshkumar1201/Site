import React, { useReducer } from "react";
import authContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setToken from "../../headerToken/setToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_AUTHENTICATED_USER,
  LOAD_AUTH_ERROR,
  CLEAR_AUTH_ERRORS,
} from "../types";

import axios from "axios";

const AuthState = (props) => {
  const initialState = {
    token_State: localStorage.getItem("token"),
    error_State: null,
    loading_State: true,
    isAuthenticate: false,
    user_State: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //LOADING AUTHENTICATED USER

  const loadAuthenticatedUser = async () => {
    //todo-- need to set global header to check token exist if exist setToken
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      console.log(res);
      dispatch({ type: LOAD_AUTHENTICATED_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: LOAD_AUTH_ERROR, payload: err.response });
    }
  };

  //register user

  const registerUser = async (userInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(userInfo);
    try {
      const res = await axios.post("/api/user", userInfo, config);
      // console.log("after register post req -response", res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      // console.log(err.response.data);
      dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
  };

  //login User
  const loginUser = async (userInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", userInfo, config);
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadAuthenticatedUser();
    } catch (err) {
      console.log(err.response.data.errors);
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
  };

  const clearAuthErrors = () => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
  };

  return (
    <authContext.Provider
      value={{
        token_State: state.token_State,
        user_State: state.user_State,
        error_State: state.error_State,
        loading_State: state.loading_State,
        isAuthenticate: state.isAuthenticate,
        registerUser,
        loginUser,
        clearAuthErrors,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
