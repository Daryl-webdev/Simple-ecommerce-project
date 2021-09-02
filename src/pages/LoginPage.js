import React from "react";
import Login from "../components/Login";

function LoginPage() {
  return (
    <div className="login-wrapper">
      <h4 className="welcome">Welcome to Pazada! Please login</h4>
      <Login />
    </div>
  );
}

export default LoginPage;
