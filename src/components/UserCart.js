import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";
export default function UserCart({
  cartData,
  fetchCartList,
  fetchCartListTotal,
}) {
  const [carts, setCarts] = useState([]);
  const [display, setDisplay] = useState("d-none");
  const [mainDisplay, setMainDisplay] = useState("");

  useEffect(() => {
    if (cartData.error || cartData.length === 0) {
      console.log(cartData);
      setDisplay("d-block no-order-container");
      setMainDisplay("");
      setCarts([]);
    } else {
      setMainDisplay("d-flex flex-column");
      setDisplay("d-none");
      const cartArr = cartData.map((cart) => {
        if (cart !== null) {
          return (
            <>
              <Cart
                cartProps={cart}
                fetchCartList={fetchCartList}
                fetchCartListTotal={fetchCartListTotal}
              />
            </>
          );
        } else return null;
      });

      setCarts(cartArr);
    }
  }, [cartData]);
  return (
    <div>
      <div className={mainDisplay}>{carts}</div>
      <div className={display}>
        <p className="text-center">You dont have any list in your Cart</p>
        <p className="text-center">
          Go Shopping{" "}
          <Link to="/product">
            <i class="fas fa-shopping-cart"></i>
          </Link>
        </p>
      </div>
    </div>
  );
}
