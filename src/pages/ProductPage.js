import React, { useState, useEffect, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import UserContext from "../UserContext";
import "../styling/ProductPage.css";
import Carousel from "../pages/Carousel";
import NavBar from "../components/NavBar";

import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function ProductPage() {
  const [carouselDisplay, setCarouselDisplay] = useState("home-component mt-5");
  const { user, isLoading, setIsLoading } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState([
    "name",
    "description",
    "price",
    "category",
  ]);

  useState(() => {
    if (user.isAdmin === true) {
      setCarouselDisplay("d-none");
    } else {
      setCarouselDisplay("home-component mt-5");
    }
  }, []);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {})
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.reverse());
      });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {})
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.reverse());
      });
  }, []);

  function search(products) {
    return products.filter((product) =>
      searchColumn.some(
        (key) =>
          product[key]
            .toString()
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1
      )
    );
  }

  const columns =
    user.isAdmin === true
      ? allProducts[0] && Object.keys(allProducts[0]).splice(1, 6)
      : allProducts[0] && Object.keys(allProducts[0]).splice(1, 4);

  return (
    <div>
      {isLoading === true ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="position-fixed w-100 nav-bar-product-div">
            <NavBar />
          </div>
          <Container fluid className="d-flex flex-column align-items-center">
            <div className="search-bar-product-div w-100">
              <div className="searchBarDiv d-flex flex-row justify-content-center align-items-center mx-auto">
                <Form.Control
                  className="text-input"
                  type="text"
                  placeholder="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="search-icon-div">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div>
              <div className={carouselDisplay}>
                <Carousel />
              </div>
              <div className="row">
                {user.isAdmin === false ? (
                  <div></div>
                ) : (
                  <div className="col-md-2 d-flex flex-column mt-5 productpage-filter">
                    <h6>Filter by:</h6>

                    {columns &&
                      columns.map((column) => (
                        <label className="nonadmin-label">
                          <input
                            type="checkbox"
                            checked={searchColumn.includes(column)}
                            onChange={(e) => {
                              const checked = searchColumn.includes(column);
                              setSearchColumn((prev) =>
                                checked
                                  ? prev.filter((sc) => sc !== column)
                                  : [...prev, column]
                              );
                            }}
                          />
                          {column}
                        </label>
                      ))}
                  </div>
                )}

                {user.isAdmin === true ? (
                  <Container fluid>
                    <div className="row">
                      <div className="offset-1 col-1 d-flex flex-column">
                        <p className="admin-filter-text">Filter By:</p>
                        {columns &&
                          columns.map((column) => (
                            <label className="nonadmin-label">
                              <input
                                type="checkbox"
                                checked={searchColumn.includes(column)}
                                onChange={(e) => {
                                  const checked = searchColumn.includes(column);
                                  setSearchColumn((prev) =>
                                    checked
                                      ? prev.filter((sc) => sc !== column)
                                      : [...prev, column]
                                  );
                                }}
                              />
                              {column}
                            </label>
                          ))}
                      </div>
                      <div className="col-9">
                        <AdminView
                          productData={search(allProducts)}
                          fetchData={fetchData}
                        />
                      </div>
                    </div>
                  </Container>
                ) : (
                  <>
                    <div className="col-10">
                      <UserView productData={search(allProducts)} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </>
      )}
    </div>
  );
}
