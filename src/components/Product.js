import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Product.css";

export default function Product({ productProps }) {
  const { _id, name, description, price, category, productImage } =
    productProps;

  return (
    <div className="card-container">
      <img
        src={`${process.env.REACT_APP_API_URL}/${productImage}`}
        className="image"
        alt={`image_of_${name}`}
      />
      <div className="body">
        <h5 clasName="product-name">{name}</h5>
        <p className="description">{`${description.substr(0, 50)}...`}</p>
        <p className="d-none">{category}</p>
        <p className="price">₱ {price}</p>
        <div className="card-btn-container">
          <Link to={`/product/${_id}`}>
            <button className="card-btn">
              Details <i class="fas fa-external-link-alt"></i>{" "}
            </button>
          </Link>

          <span className="cart-icon">
            <i class="fas fa-shopping-cart"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
