import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux


import { Link, useNavigate } from "react-router-dom";

// Formik validation


//Social Media Imports

// import TwitterLogin from "react-twitter-auth"

// actions


import logoLight from "../../assets/images/logo-light.png";
//Import config


import withRouter from "../../Components/Common/withRouter";
import SignContext from "../../contextAPI/Context/SignContext";

const Login = () => {
  const { loginUser } = useContext(SignContext);
  const navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
  };

  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(UserInfo);
    console.log(res.roles.role)
    if (res.success) {
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("authToken", res.token);
      window.localStorage.setItem("user", JSON.stringify(res));
      window.localStorage.setItem("rights", JSON.stringify(res.roles));
      if (res.roles.role === "Admin") {
        setSuccess(res.msg);
        navigate("/dashboard");
        setTimeout(() => {
        }, 1000);
      } else {
        setSuccess(res.msg);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  document.title = "SignIn | Dj";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo" style={{fontSize : "20px" , color : "white"}}>
                      Shalin
                    </Link>
                  </div>
                  {/* <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p> */}
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue.
                      </p>
                    </div>
                    {Error && Error ? (
                      <Alert color="danger"> {Error} </Alert>
                    ) : null}
                    {Success && Success ? (
                      <Alert color="success"> {Success} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Email
                          </Label>
                          <Input
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            name="email"
                            value={UserInfo.email}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type="password"
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              name="password"
                              value={UserInfo.password}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        {/* <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div> */}

                        <div className="mt-4">
                          <Button
                            color="success"
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign In
                          </Button>
                        </div>

                        {/* <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div>
                          </div>
                        </div> */}
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Forgot Password ?{" "}
                    <Link
                      to="/forgot-password"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Forgot{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);