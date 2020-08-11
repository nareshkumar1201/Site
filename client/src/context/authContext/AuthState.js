import React, { useReducer } from "react";
import authContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../types";
import { v4 as uuid } from "uuid";
import axios from "axios";

const AuthState = (props) => {
  const initialState = {
    token_State: localStorage.getItem("token"),
    error_State: null,
    loading_State: true,
    isAuthenticate: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Add register user datails

  // const registerUser = (userInfo) => {
  //   userInfo.id = uuid();
  //   console.log(userInfo);
  //   dispatch({ type: REGISTER_SUCCESS, payload: userInfo });
  // };

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
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
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
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
