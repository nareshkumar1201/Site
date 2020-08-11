import React, { Fragment, useState, useContext } from "react";
import AuthContext from "../context/authContext/AuthContext";

const SignIn = () => {
  const authContext = useContext(AuthContext);
  const { loginUser } = authContext;
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
    console.log("register forom submited");
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please enter all fields");
    } else {
      alert("successfully register");
      loginUser({
        email,
        password,
      });

      setUser({
        email: "",
        password: "",
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
