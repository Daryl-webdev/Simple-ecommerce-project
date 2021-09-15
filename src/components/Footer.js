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
          <p className="footer-heading">Pazada App</p>
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
              <p className="footer-motto">Go where your heart beats</p>
              <p className="footer-heading">Download the App</p>
            </div>
            <div>
              <img
                src="https://data.ibtimes.sg/en/full/12247/google-play-store-8-1-73-apk.png"
                alt="logo"
                className="google"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-2">
        <p className="footer-disclaimer">
          Disclaimer: This project has no intention to plagiarize Lazada, this
          is for Educational Purposes Only
        </p>
        <p className="footer-disclaimer">I'm a regular customer of Lazada ❤</p>
      </div>
    </div>
  );
}

export default Footer;
