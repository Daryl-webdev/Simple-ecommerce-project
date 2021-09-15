import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../UserContext";

export default function NavBar() {
  const { user, unsetUser, count } = useContext(UserContext);

  const history = useHistory();

  const logout = () => {
    unsetUser();
    history.push("/login");
  };
  let rightNav =
    user.email === null ? (
      <>
        <Nav.Link className="nav-link" as={NavLink} to="/login">
          Login
        </Nav.Link>
        <Nav.Link className="nav-link" as={NavLink} to="/register">
          Register
        </Nav.Link>
      </>
    ) : (
      <>
        {user.isAdmin === true ? (
          <Nav.Link className="nav-link" as={NavLink} to="/all-orders">
            All Orders
          </Nav.Link>
        ) : (
          <>
            <Nav.Link className="nav-link" as={NavLink} to="/my-order">
              My Order
            </Nav.Link>
            <Nav.Link className="nav-link" as={NavLink} to="/my-cart">
              <i class="fas fa-shopping-cart">
                {" "}
                <span className="badge cart-count">
                  {count > 0 ? count : ""}
                </span>
              </i>
            </Nav.Link>
          </>
        )}
        <Nav.Link className="nav-link" onClick={logout}>
          Logout
        </Nav.Link>
      </>
    );
  return (
    <div className="navbar-div">
      <Navbar className="nav-container ml-auto">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="nav-link" as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="nav-link" as={NavLink} to="/product">
              Products
            </Nav.Link>
            <Nav className="ml-auto">{rightNav}</Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
