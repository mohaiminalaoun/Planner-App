import FacebookLogin from "react-facebook-login";
import React from "react";
import "./LoginPage.scss";

const LoginPage = props => {
  return (
    <>
      <div className="login-welcome">Welcome to Planner App</div>
      <FacebookLogin
        appId="176625356093687"
        autoLoad={false}
        callback={props.responseFacebook}
        cssClass="my-facebook-button-class"
        fields="name,email,picture"
      />
    </>
  );
};

export default LoginPage;
