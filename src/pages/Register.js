import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../styling/register.css";
import NavBar from "../components/NavBar";

const Register = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [registerBtn, setRegisterBtn] = useState(false);

  //password abd verify-passowrd hide/unhide state
  const [showPassword, setShowPassword] = useState(false);
  const [showVerPassword, setShowVerPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState("fas fa-eye-slash");
  const [showVerPasswordIcon, setShowVerPasswordIcon] =
    useState("fas fa-eye-slash");

  //validation states
  const [emailValidationIcon, setEmailValidationIcon] = useState("");
  const [userNameValidationIcon, setUserNameValidationIcon] = useState("");
  const [passwordValidationIcon, setPasswordValidationIcon] = useState("");
  const [verifyPasswordValidationIcon, setVerifyPasswordValidationIcon] =
    useState("");

  const [emailValidation, setEmailValidation] = useState("");
  const [userNameValidation, setUserNameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [verifyPasswordValidation, setVerifyPasswordValidation] = useState("");
  //================================email availability==========================
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //data true == email available
        if (email !== "") {
          if (data === false) {
            setEmailValidation("text-danger");
            setEmailValidationIcon("fas fa-times-circle");
          } else {
            setEmailValidation("text-success");
            setEmailValidationIcon("fas fa-check-circle");
          }
        } else {
          setEmailValidation("");
          setEmailValidationIcon("");
        }
      });
  }, [email]);

  //================================username availability==========================
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //data true == username available
        if (userName !== "") {
          if (data === false) {
            setUserNameValidation("text-danger");
            setUserNameValidationIcon("fas fa-times-circle");
          } else {
            setUserNameValidation("text-success");
            setUserNameValidationIcon("fas fa-check-circle");
          }
        } else {
          setUserNameValidation("");
          setUserNameValidationIcon("");
        }
      });
  }, [userName]);

  //================================password ==========================
  //password length
  useEffect(() => {
    if (password) {
      if (password.length < 6) {
        setPasswordValidation("text-danger");
        setPasswordValidationIcon("fas fa-times-circle");
      } else {
        setPasswordValidation("text-success");
        setPasswordValidationIcon("fas fa-check-circle");
      }
    } else {
      setPasswordValidation("");
      setPasswordValidationIcon("");
    }
  }, [password]);

  //password and verify-password match

  useEffect(() => {
    if (verifyPassword !== "") {
      if (password && verifyPassword && password !== verifyPassword) {
        setVerifyPasswordValidation("text-danger");
        setVerifyPasswordValidationIcon("fas fa-times-circle");
      } else {
        setVerifyPasswordValidation("text-success");
        setVerifyPasswordValidationIcon("fas fa-check-circle");
      }
    } else {
      setVerifyPasswordValidation("");
      setVerifyPasswordValidationIcon("");
    }
  }, [verifyPassword, password]);

  //hide/unhide toggler
  const passwordToggler = () => {
    if (showPassword) {
      setShowPassword(false);
      setShowPasswordIcon("fa fa-eye-slash");
    } else {
      setShowPassword(true);
      setShowPasswordIcon("fa fa-eye");
    }
  };

  const verPasswordToggler = () => {
    if (showVerPassword) {
      setShowVerPassword(false);
      setShowVerPasswordIcon("fa fa-eye-slash");
    } else {
      setShowVerPassword(true);
      setShowVerPasswordIcon("fa fa-eye");
    }
  };

  //============================form inputs======================
  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      userName !== "" &&
      email !== "" &&
      password.length >= 6 &&
      verifyPassword !== "" &&
      password === verifyPassword
    ) {
      setRegisterBtn(true);
    } else {
      setRegisterBtn(false);
    }
  }, [
    firstName,
    lastName,
    email,
    password,
    userName,
    verifyPassword,
    registerBtn,
  ]);

  //==================registration form function==========================
  function registerUser(e) {
    e.preventDefault();
    console.log('test',process.env.REACT_APP_API_URL)
    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Yaaaaaaay!!!",
            icon: "success",
            text: data.success,
          });
          history.push("/login");
        } else {
          Swal.fire({
            title: "Opps!!!",
            icon: "error",
            text: data.error,
          });
        }
      })
      .catch((err) => console.log(`You have an error: ${err.message}`));
  }

  return (
    <>
      <div className="register-nav">
        <NavBar />
      </div>
      <div className="register-wrapper">
        <Link to="/product">
          <p className="login-close-btn d-md-none">
            <i class="fas fa-angle-left"></i>
          </p>
        </Link>

        <Container className="register-div mt-md-5">
          <p className="register-welcome">Welcome to Pazada</p>
          <Form className="register-form" onSubmit={(e) => registerUser(e)}>
            <div className="row">
              <div className="col-sm-12 col-md-6 ">
                <Form.Group className="register-form-group">
                  <Form.Label for="regFirstName"> Firstname: </Form.Label>
                  <Form.Control
                    id="regFirstName"
                    type="text"
                    required
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="register-form-group">
                  <Form.Label for="regLastName"> Lastname: </Form.Label>
                  <Form.Control
                    id="regLastName"
                    type="text"
                    required
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="register-form-group">
                  <Form.Label for="regUserName"> Username: </Form.Label>
                  <Form.Control
                    id="regUserName"
                    type="text"
                    required
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-12 col-md-6">
                <Form.Group className="register-form-group">
                  <Form.Label for="regEmail"> Email Adress</Form.Label>
                  <Form.Control
                    id="regEmail"
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="register-form-group">
                  <Form.Label id="regPassword">Password</Form.Label>
                  <div className="position-relative d-flex">
                    <Form.Control
                      id="regPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Password must be atleast 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="position-absolute icon-div d-flex justify-content-center align-items-center px-2">
                      <i
                        className={showPasswordIcon}
                        onClick={passwordToggler}
                      ></i>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group className="register-form-group">
                  <Form.Label>Verify password</Form.Label>
                  <div className="position-relative d-flex">
                    <Form.Control
                      type={showVerPassword ? "text" : "password"}
                      required
                      placeholder="Verify password"
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    <div className="position-absolute icon-div d-flex justify-content-center align-items-center px-2">
                      <i
                        className={showVerPasswordIcon}
                        onClick={verPasswordToggler}
                      ></i>
                    </div>
                  </div>
                </Form.Group>
              </div>
            </div>
            {registerBtn ? (
              <Button type="submit" className="ml-3 register-btn">
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-3 register-btn"
                disabled={true}
              >
                Submit
              </Button>
            )}
            <small className="mt-md-3 ml-md-3 d-block register-text">
              Already have an account? <Link to="/login">Log in Account</Link>{" "}
            </small>
          </Form>

          <ul className="register-validation">
            <li className={emailValidation}>
              Email unique <i class={emailValidationIcon}></i>
            </li>
            <li className={userNameValidation}>
              Username unique <i class={userNameValidationIcon}></i>{" "}
            </li>
            <li className={passwordValidation}>
              Pasword is atleast 6 characters{" "}
              <i class={passwordValidationIcon}></i>
            </li>
            <li className={verifyPasswordValidation}>
              Password match <i class={verifyPasswordValidationIcon}></i>
            </li>
          </ul>
        </Container>
      </div>
    </>
  );
};

export default Register;
