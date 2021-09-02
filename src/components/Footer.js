import React from "react";
import "../styling/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="row">
        <div className="col-md-3">
          <p className="footer-heading">Customer Care</p>
          <ul>
            <li>
              <a href="https://www.google.com">Help Center</a>
            </li>
            <li>
              <a href="https://www.google.com">How to Buy</a>
            </li>
            <li>
              <a href="https://www.google.com">Shipping and Delivery</a>
            </li>
            <li>
              <a href="https://www.google.com">International Prouduct Policy</a>
            </li>
            <li>
              <a href="https://www.google.com">Question?</a>
            </li>
            <li>
              <a href="https://www.google.com">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <p className="footer-heading">App name here</p>
          <ul>
            <li>
              <a href="https://www.google.com">About this app</a>
            </li>
            <li>
              <a href="https://www.google.com">Affiliate Program</a>
            </li>
            <li>
              <a href="https://www.google.com">App Infuluencer Program</a>
            </li>
            <li>
              <a href="https://www.google.com">Terms and Conditions</a>
            </li>
            <li>
              <a href="https://www.google.com">Privacy Policy</a>
            </li>
            <li>
              <a href="https://www.google.com">Press and Media</a>
            </li>
            <li>
              <a href="https://www.google.com">Campaign Terms and Conditions</a>
            </li>
            <li>
              <a href="https://www.google.com">
                Intellectual Property Protection
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-6 ">
          <div className="d-flex align-items-center">
            <img
              src="https://laz-img-cdn.alicdn.com/tfs/TB1iTziekWE3KVjSZSyXXXocXXa-42-42.png"
              alt="lazada logo"
            />
            <div className="download-container">
              <p>Go where your heart beats</p>
              <p className="footer-heading">Download the App</p>
            </div>
            <div>
              <img
                src="http://assets.stickpng.com/images/5a902dbf7f96951c82922875.png"
                alt="logo"
                className="google"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
