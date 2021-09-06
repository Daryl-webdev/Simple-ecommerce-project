import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import HomePage from "./pages/HomePage";
import Product from "./pages/ProductPage";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import SpecificProduct from "./pages/SpecificProduct";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import { Fragment, useState } from "react";

import Footer from "./components/Footer";

import UserContext from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({
    email: localStorage.getItem("email"),
    accessToken: localStorage.getItem("accessToken"),
    isAdmin: localStorage.getItem("isAdmin"),
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      email: null,
      accessToken: null,
      isAdmin: null,
    });
  };

  return (
    <Fragment>
      <UserContext.Provider
        value={{
          user,
          setUser,
          unsetUser,
          isLoading,
          setIsLoading,
          count,
          setCount,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/product" component={Product} />

            <Route exact path="/register">
              {user.email ? <Redirect to="/" /> : <Register />}
            </Route>

            <Route exact path="/my-order">
              {user.email === null ? <Redirect to="/" /> : <OrderPage />}
            </Route>

            <Route exact path="/my-cart">
              {user.email === null ? <Redirect to="/" /> : <CartPage />}
            </Route>

            <Route exact path="/login">
              {user.email ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route
              exact
              path="/product/:productId"
              component={SpecificProduct}
            />

            <Route exact path="*" component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
