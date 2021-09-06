import React, { useContext } from "react";
// import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Product.css";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Product({ productProps }) {
  const { setCount, count } = useContext(UserContext);
  const { _id, name, description, price, category, productImage } =
    productProps;

  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/add-cart/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        productQty: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          Swal.fire({
            title: "Opps!!!",
            icon: "Error",
            text: "Something went wrong",
          });
        } else {
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: `You added ${name} to your Cart`,
          });
          setCount(count + 1);
        }
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };
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
        <p className="price">
          ₱ {price.toLocaleString()}.00 <small>x{}</small>
        </p>
        <div className="card-btn-container">
          <Link to={`/product/${_id}`}>
            <button className="card-btn">
              Details <i class="fas fa-external-link-alt"></i>{" "}
            </button>
          </Link>

          <span className="cart-icon">
            <i onClick={() => addToCart()} class="fas fa-shopping-cart"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
