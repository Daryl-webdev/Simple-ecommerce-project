import React, { useEffect, useState } from "react";
import Cart from "./Cart";

export default function UserCart({ cartData }) {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartArr = cartData.map((cart) => {
      if (cart !== null) {
        return <Cart cartProps={cart} />;
      } else return null;
    });

    setCarts(cartArr);
  }, [cartData]);
  return <div className="wrapper d-grid">{carts}</div>;
}
