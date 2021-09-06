import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import { Link } from "react-router-dom";
import "../styling/NoOrder.css";

function UserOrder({ orderData }) {
  const [orders, setOrders] = useState([]);
  const [display, setDisplay] = useState("d-none");
  const [mainDisplay, setMainDisplay] = useState("");
  useEffect(() => {
    if (orderData.error) {
      setDisplay("d-block no-order-container");
      setMainDisplay("");
    } else {
      setMainDisplay("wrapper d-grid");
      setDisplay("d-none");
      const orderArr = orderData.map((order) => {
        if (order !== null) {
          return <Orders orderProps={order} />;
        } else return null;
      });

      setOrders(orderArr);
    }
  }, [orderData]);
  return (
    <div className={mainDisplay}>
      {orders}
      <div className={display}>
        <div className="d-flex justify-content-center align-items-center flex-column no-order-page">
          <i class="fas fa-frown-open"></i>
          <h5>LOL Walang laman hampaslupa</h5>
          <p>
            Shopping ka muna{" "}
            <Link to="/product">
              <i class="fas fa-shopping-cart"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
