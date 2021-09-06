import React from "react";
import { Link } from "react-router-dom";

export default function Orders({ orderProps }) {
  const {
    productName,
    productPrice,
    productImage,
    productId,
    productQty,
    productDescription,
  } = orderProps;

  const totalAmount = productPrice * productQty;
  return (
    <div className="card-container">
      <img
        src={`${process.env.REACT_APP_API_URL}/${productImage}`}
        className="image"
        alt={`image_of_${productName}`}
      />
      <div className="body">
        <h5 clasName="product-name">{productName}</h5>
        <p className="description">{`${productDescription.substr(
          0,
          50
        )}...`}</p>
        <p className="d-none">category</p>
        <p className="price">
          ₱ {productPrice}
          <small> x{productQty}</small>
        </p>

        <small>Total ₱{totalAmount}</small>

        {/* <Link to={`/product/${productId}`}>
          <button className="card-btn">Details</button>
        </Link> */}
      </div>
    </div>
  );
}
