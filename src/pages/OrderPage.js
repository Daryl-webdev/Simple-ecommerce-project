import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import UserOrder from "../components/UserOrder";

export default function OrderPage() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/get-order`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-center">Order History</h1>
      <UserOrder orderData={orderList} />
    </div>
  );
}
