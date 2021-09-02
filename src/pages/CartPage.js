import React, { useState, useEffect } from "react";
import UserCart from "../components/UserCart";

export default function CartPage() {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
  }, []);

  return (
    <div>
      <UserCart cartData={cartList} />
    </div>
  );
}
