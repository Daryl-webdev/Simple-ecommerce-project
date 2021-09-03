import React from "react";
import Login from "../components/Login";

function LoginPage() {
  return (
    <div className="login-wrapper">
      <h5 className="welcome">Welcome to Pazada! Please login</h5>
      <Login />
    </div>
  );
}

export default LoginPage;
