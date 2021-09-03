import React, { useState, useEffect, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import UserContext from "../UserContext";
import "../styling/ProductPage.css";

import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function ProductPage() {
  console.log(process.env.REACT_APP_API_URL);
  const { user, isLoading, setIsLoading } = useContext(UserContext);
  const [allProducts, setAllProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState(["name", "description"]);

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
    return products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        product.isActive
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1 ||
        product.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 ||
        product.price
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1
    );
  }

  const columns = user.isAdmin
    ? allProducts[0] && Object.keys(allProducts[0]).splice(1, 6)
    : allProducts[0] && Object.keys(allProducts[0]).splice(1, 4);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Container fluid className="d-flex flex-column align-items-center">
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
          <div>
            <div className="row">
              {user.isAdmin ? (
                <div>
                  <h6>Filter by:</h6>
                  <select>
                    {columns &&
                      columns.map((column) => (
                        <option value={column}>
                          {column.charAt(0).toUpperCase() +
                            column.slice(1).toLowerCase()}
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                <div className="col-md-1 d-flex flex-column sidebar-container">
                  <h6 className="nonadmin-filter">Filter by:</h6>
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

              {user.isAdmin ? (
                <Container fluid>
                  <AdminView
                    productData={search(allProducts)}
                    fetchData={fetchData}
                  />
                </Container>
              ) : (
                <div className="col-md-11">
                  <UserView productData={search(allProducts)} />
                </div>
              )}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
