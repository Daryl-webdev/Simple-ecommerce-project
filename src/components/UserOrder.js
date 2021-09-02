import React, { useEffect, useState } from "react";
import Orders from "./Orders";

function UserOrder({ orderData }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderArr = orderData.map((order) => {
      if (order !== null) {
        return <Orders orderProps={order} />;
      } else return null;
    });

    setOrders(orderArr);
  }, [orderData]);
  return <div className="wrapper d-grid">{orders}</div>;
}

export default UserOrder;
