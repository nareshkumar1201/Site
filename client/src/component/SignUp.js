import React, { Fragment, useState, useContext } from "react";
import AuthContext from "../context/authContext/AuthContext";
import M from "materialize-css/dist/js/materialize.min.js";

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpwd: "",
  });
  const { username, email, password, confirmpwd } = user;

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
      console.log("please enter all feilds");
      alert("please enter all fields");
    } else if (password !== confirmpwd) {
      console.log("password should match");
      alert("passwords should match");
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

      M.toast({ html: `Registerd Successfully` });
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
                      type="text"
                      className="validate"
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
                    />
                    <label htmlFor="userPwd">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="confirmPwd"
                      type="password"
                      className="validate"
                      name="confirmpwd"
                      value={confirmpwd}
                      onChange={onChange}
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
