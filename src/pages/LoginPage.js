import React from "react";
import Login from "../components/Login";
import NavBar from "../components/NavBar";

function LoginPage() {
  return (
    <>
      <NavBar />
      <div className="login-wrapper mt-5 mb-5">
        <h5 className="d-flex justify-content-center">
          Welcome to Pazada! Please login
        </h5>
        <Login />
      </div>
    </>
  );
}

export default LoginPage;
