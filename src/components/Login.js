import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Redirect, Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const Login = () => {
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}users/facebook-login`,
      data: { accessToken: response.accessToken, userID: response.userID },
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.authUser) {
          localStorage.setItem("accessToken", data.authUser);
          setUser({ accessToken: data.authUser });
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: "You have successfully Logged in",
          });

          fetch(`${process.env.REACT_APP_API_URL}/users/`, {
            headers: {
              Authorization: `Bearer ${data.authUser}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("email", data.email);
              localStorage.setItem("userName", data.userName);
              localStorage.setItem("isAdmin", data.isAdmin);
              setUser({
                email: data.email,
                isAdmin: data.isAdmin,
              });
              if (data.isAdmin) {
                history.push("/product");
              } else {
                history.push("/");
              }
            });
        } else if (data.error) {
          Swal.fire({
            title: "Opps!!!",
            icon: "error",
            text: data.error,
          });
        }
        setEmail("");
        setPassword("");
      })

      .catch((err) => console.log(err));
  };

  const responseGoogle = (response) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/users/google-login`,
      data: { tokenId: response.tokenId },
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        if (data.authUser) {
          localStorage.setItem("accessToken", data.authUser);
          setUser({ accessToken: data.authUser });
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: "You have successfully Logged in",
          });

          fetch(`${process.env.REACT_APP_API_URL}/users/`, {
            headers: {
              Authorization: `Bearer ${data.authUser}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("email", data.email);
              localStorage.setItem("userName", data.userName);
              localStorage.setItem("isAdmin", data.isAdmin);
              setUser({
                email: data.email,
                isAdmin: data.isAdmin,
              });
              if (data.isAdmin) {
                history.push("/product");
              } else {
                history.push("/");
              }
            });
        } else if (data.error) {
          Swal.fire({
            title: "Opps!!!",
            icon: "error",
            text: data.error,
          });
        }
        setEmail("");
        setPassword("");
      })

      .catch((err) => console.log(err));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const [loginBtn, setLoginBtn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (email && password) {
      setLoginBtn(true);
    } else {
      setLoginBtn(false);
    }
  }, [email, password, loginBtn]);

  function loginUser(e) {
    e.preventDefault();
    let newBody = {
      password: password,
    };
    if (email.includes("@")) {
      newBody.email = email;
    } else {
      newBody.userName = email;
    }
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.authUser) {
          localStorage.setItem("accessToken", data.authUser);
          setUser({ accessToken: data.authUser });
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: "You have successfully Logged in",
          });

          fetch(`${process.env.REACT_APP_API_URL}/users/`, {
            headers: {
              Authorization: `Bearer ${data.authUser}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("email", data.email);
              localStorage.setItem("userName", data.userName);
              localStorage.setItem("isAdmin", data.isAdmin);
              setUser({
                email: data.email,
                isAdmin: data.isAdmin,
              });
              if (data.isAdmin) {
                history.push("/product");
              } else {
                history.push("/");
              }
            });
        } else if (data.error) {
          Swal.fire({
            title: "Opps!!!",
            icon: "error",
            text: data.error,
          });
        }
        setEmail("");
        setPassword("");
      })

      .catch((err) => console.log(err));
  }

  if (user.accessToken) {
    <Redirect to="/" />;
  }
  return (
    <Container className="login-div">
      <Row>
        <Col className="col-7">
          <Form onSubmit={(e) => loginUser(e)}>
            <Form.Group>
              <Form.Label for="loginEmail"> Email/Username*</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Please enter your Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="loginEmail"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="loginPassword">Password*</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Please enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="loginPassword"
              />
            </Form.Group>
            {loginBtn ? (
              <Button type="submit">Login</Button>
            ) : (
              <Button type="submit" disabled="true">
                Login
              </Button>
            )}

            <small className="mt-3 d-block">
              Waley ka account? <Link to="/register">Create account</Link>{" "}
            </small>
          </Form>
        </Col>
        <Col className="col-5">
          <div className="google-btn-div">
            <GoogleLogin
              clientId="179012172148-9ro5ak1uts4dt5frs1oeer1j34ntuega.apps.googleusercontent.com"
              buttonText="Login with Google"
              className="google-btn"
              onSuccess={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            <FacebookLogin
              appId="1045988489507953"
              autoLoad={false}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
              callback={responseFacebook}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
