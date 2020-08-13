import React, { Fragment } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Alert from "./Alert";
import { Route, Switch } from "react-router-dom";

import showcaseImg from "../images/showcaseImg.jpg";

const ShowCase = () => {
  return (
    <div className="showCase">
      <div className="showCase--item showCase--item-1" style={backgroundImage}>
        {/* <img src="#!" alt="showcaseImage-1" />   showCase--item-1__title  */}
        <div className="showCase--item-1__title">
          <h4>Title</h4>
        </div>
        <div className="showCase--item-1__caption">
          <p>Lorem ipsum dolor sit amet, consectetur tempora?</p>
        </div>
      </div>
      <div className="showCase--item showCase--item-2">
        {" "}
        <Fragment>
          <Alert />
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </Fragment>
      </div>
    </div>
  );
};

const backgroundImage = {
  backgroundImage: `url(${showcaseImg})`,
  backgroundSize: `cover`,
  backgroundPosition: `top`,
  position: `relative`,
};

export default ShowCase;
