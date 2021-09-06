import React, { useState, useEffect, useContext } from "react";
//bootstrap
import { Button } from "react-bootstrap";
//react router
import { useHistory, useParams, Link } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import UserContext from "../UserContext";
import "../styling/SpecificProduct.css";

import Swal from "sweetalert2";
import NavBar from "../components/NavBar";

export default function SpecificProduct() {
  const { user, isLoading, setIsLoading, setCount, count } =
    useContext(UserContext);
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const { productId } = useParams();
  const [productQty, setProductQty] = useState(1);
  const [decrementBtn, setDecrementBtn] = useState(false);

  //for styling
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    if (productQty < 2) {
      setDecrementBtn(true);
    } else {
      setDecrementBtn(false);
    }
  }, [productQty]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setProductImage(data.productImage);
      });
    setIsLoading(false);
  });

  const orderProduct = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/add-order/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        productQty: productQty,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
            text: "You have successfully Order",
          });
          history.push("/product");
        }
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const addToCart = (productId) => {
    console.log("asd");
    fetch(`${process.env.REACT_APP_API_URL}/carts/add-cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        productQty: productQty,
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
  //for styling only
  useState(() => {
    const ratings = Math.floor(Math.random() * 1000);
    setRatings(ratings);
  }, []);

  return (
    <>
      <NavBar />
      <div>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="product-wrapper">
            <div className="product-container">
              <div className="img-container">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${productImage}`}
                  className="image-product"
                  alt={`image_of_${name}`}
                />
                <h4 className="product-name">{name}</h4>
              </div>
              <div className="info-container">
                <p className="product-description">
                  {" "}
                  [Paszada Exclusive] {description}
                </p>
                <span className="ratings">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i> {ratings} Ratings:
                </span>
                <p className="brand">
                  Brand: <a href="www.google.com">{name}</a>
                </p>

                <img
                  className="specific-lzd-discount"
                  src="https://gcp-img.slatic.net/lazada/id0087817-480-72.jpg_1200x1200q80.jpg_.webp"
                  alt="lzd_discount"
                />

                <p className="price"> &#8369; {price.toLocaleString()}.00</p>
                <div className="d-flex flex-row specific-discount">
                  <strike className="specific-cross-out">
                    {" "}
                    &#8369; {(price * 2).toLocaleString()}.00
                  </strike>

                  <div className="ml-1">
                    <span className="specific-percentage"> -50% </span>
                  </div>
                </div>
                <p className="specific-qty d-inline mr-4">Quantity</p>

                <button
                  disabled={decrementBtn}
                  className="specific-decrement"
                  onClick={() => setProductQty(productQty - 1)}
                >
                  <i class="fas fa-minus"></i>
                </button>
                <span className="m-2">{productQty}</span>
                <button
                  className="specific-increment"
                  onClick={() => setProductQty(productQty + 1)}
                >
                  <i class="fas fa-plus"></i>
                </button>
                <div className="specific-btn-container">
                  {user.email ? (
                    <div className="d-flex align-items-center">
                      <button
                        className="specific-order"
                        onClick={() => orderProduct(productId)}
                      >
                        Buy Now
                      </button>

                      <button
                        className="specific-cart"
                        onClick={() => addToCart(productId)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <Link to="/login">
                      <Button>Login to order</Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="contact-container">
                <h1>contacts</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
