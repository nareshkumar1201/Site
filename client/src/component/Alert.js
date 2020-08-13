import React, { useContext } from "react";
import AlertContext from "../context/alertContext/AlertContext";
import "materialize-css/dist/css/materialize.min.css";

const Alert = () => {
  const { errors } = useContext(AlertContext);
  console.log(errors);
  return (
    errors.length > 0 &&
    errors.map((err) => (
      <div key={err.id} className={`alert alert-${err.type}`}>
        <i className="material-icons"> error </i>
        <span className="alert-msg"> {err.msg}</span>
      </div>
    ))
  );
};

export default Alert;
