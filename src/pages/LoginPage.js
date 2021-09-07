import React from "react";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "../styling/Login.css";

function LoginPage() {
  return (
    <>
      <div className="login-navbar">
        <NavBar />
      </div>
      <div className="login-wrapper mt-md-5 mb-md-5">
        <Link to="/product">
          <p className="login-close-btn">
            <i class="fas fa-angle-left"></i>
          </p>
        </Link>

        <h5 className="d-flex justify-content-center login-welcome">
          Welcome to Pazada! Please login
        </h5>

        <Login />
      </div>
    </>
  );
}

export default LoginPage;
