import React, { useState, useEffect } from "react";
import Product from "./Product";
import "../styling/Product.css";

export default function UserView({ productData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productArr = productData.map((product) => {
      if (product.isActive) {
        return <Product key={product._id} productProps={product} />;
      } else return null;
    });

    setProducts(productArr);
  }, [productData]);

  return <div className="wrapper d-grid">{products}</div>;
}
