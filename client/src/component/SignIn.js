import React, { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext/AuthContext";
import AlertContext from "../context/alertContext/AlertContext";
// import Alert from "./Alert";
// import Home from "./Home";

const SignIn = (props) => {
  const {
    loginUser,
    error_State,
    loading_State,
    isAuthenticate,
    clearAuthErrors,
  } = useContext(AuthContext);

  const { showAlert } = useContext(AlertContext);

  useEffect(
    (e) => {
      if (!loading_State && error_State !== null) {
        error_State.map((err) => {
          // <Alert errormsg={err.msg} />;
          // alert(err.msg);
          showAlert(err.msg, "danger");
          clearAuthErrors();
        });
      }
      if (isAuthenticate) {
        props.history.push("/");
        //eslint-disable-next-line
      }
    },
    [error_State, isAuthenticate === true]
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    console.log("login form submited");
    e.preventDefault();
    if (email === "" || password === "") {
      showAlert("please enter all fields", "danger");
    } else {
      loginUser({
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
      <div className="formSection">
        <div className="formSection--item">
          <div className="card formCard">
            <div className="card-content">
              <span className="card-title ceter"> SignIn</span>
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="useremail"
                      name="email"
                      value={email}
                      type="email"
                      className="validate"
                      onChange={onChange}
                    />
                    <label htmlFor="useremail">Enter Email</label>
                    <span
                      className="helper-text"
                      data-error="wrong"
                      data-success="right"
                    >
                      abc@gmail.com
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="userPwd"
                      name="password"
                      value={password}
                      type="password"
                      className="validate"
                      onChange={onChange}
                      minLength={8}
                    />
                    <label htmlFor="userPwd">Password</label>
                  </div>
                </div>
                <button
                  className="btn btn-block waves-effect waves-light"
                  type="submit"
                  name="submit"
                  id="signin-btn"
                  onSubmit={onSubmit}
                >
                  SignIn
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
