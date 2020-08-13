import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { v4 as uuid } from "uuid";
import { SHOW_ALERT, DISMISS_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (msg, type, timeout = 2500) => {
    const id = uuid();
    dispatch({ type: SHOW_ALERT, payload: { msg, type, id } });

    setTimeout(() => {
      dispatch({ type: DISMISS_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider value={{ errors: state, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
