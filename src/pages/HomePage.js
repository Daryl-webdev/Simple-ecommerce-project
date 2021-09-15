import React from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="transparent-div">
        <div className="dark-transparent-div d-flex flex-column ">
          <h1>Shop From home</h1>
          <Link to="/product">
            <button className="btn-home">Shop Now! </button>
          </Link>
        </div>
      </div>
      <div className="d-sm-none d-md-block">
        <Carousel />
      </div>
    </div>
  );
}

export default HomePage;
