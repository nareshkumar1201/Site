import React, { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext/AuthContext";
// import M from "materialize-css/dist/js/materialize.min.js";
import AlertContext from "../context/alertContext/AlertContext";

const SignUp = () => {
  const {
    registerUser,
    user_State,
    error_State,
    loading,
    clearAuthErrors,
  } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpwd: "",
  });
  const { username, email, password, confirmpwd } = user;

  useEffect(
    (e) => {
      if (!loading && error_State !== null) {
        error_State.map((err) => {
          showAlert(err.msg, "danger");
          clearAuthErrors();
          // setUser({});
        });
      }

      if (user_State !== null) {
        showAlert(user_State.msg, "success", 4000);
      }

      // showAlert(msg, "success", 4000);
    },
    [error_State, loading, user_State]
  );

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("enter onSubmit in register");
    if (username === "" || email === "" || password === "") {
      showAlert("please enter all fields", "danger");
    } else if (password !== confirmpwd) {
      showAlert("passwords should match", "danger");
    } else {
      console.log(user);
      const newUser = {
        username,
        email,
        password,
      };
      registerUser(newUser);
      setUser({
        username: "",
        email: "",
        password: "",
        confirmpwd: "",
      });

      // showAlert(user_State.msg, "success", 4000);

      // M.toast({
      //   html: `Registerd Successfully --Now you can Login in to you account`,
      // });
    }
  };

  return (
    <Fragment>
      <div className="formSection">
        <div className="formSection--item">
          <div className="card formCard">
            <div className="card-content">
              <span className="card-title ceter"> User SignUp</span>
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="username"
                      name="username"
                      value={username}
                      className="validate"
                      type="text"
                      onChange={onChange}
                    />
                    <label htmlFor="username">Enter Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="useremail"
                      name="email"
                      value={email}
                      type="email"
                      onChange={onChange}
                      className="validate"
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
                      onChange={onChange}
                      className="validate"
                      minLength={8}
                    />
                    <label htmlFor="userPwd">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="confirmPwd"
                      type="password"
                      name="confirmpwd"
                      value={confirmpwd}
                      onChange={onChange}
                      className="validate"
                      minLength={8}
                    />
                    <label htmlFor="confirmPwd">Confirm Password</label>
                  </div>
                </div>
                <button
                  className="btn btn-block waves-effect waves-light"
                  type="submit"
                  name="submit"
                >
                  SignUp
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

export default SignUp;
