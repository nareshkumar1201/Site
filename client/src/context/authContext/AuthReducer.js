import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_AUTHENTICATED_USER,
  LOAD_AUTH_ERROR,
  CLEAR_AUTH_ERRORS,
} from "../types";
const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticate: false,
        loading_State: true,
        user_State: action.payload,
        error_State: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticate: true,
        loading_State: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        error_State: action.payload.errors,
        isAuthenticate: false,
        loading_State: false,
        token: null,
      };
    case LOAD_AUTHENTICATED_USER:
      return {
        ...state,
        isAuthenticate: true,
        loading_state: false,
        user_State: action.payload,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error_State: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
