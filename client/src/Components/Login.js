import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchemaValidation } from "../Validations/UserValidations";
import "./Login.css"; 
const Login = () => {
  const { msg, isLogin } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate("/home");
  }, [isLogin, navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const handleLogin = (data) => {
    dispatch(login({ email: data.email, password: data.password }));
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md="6" lg="5">
            <div className="login-card">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Please sign in to continue</p>

              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="input-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    {...register("password")}
                  />
                  <p className="error">{errors.password?.message}</p>
                </div>

                <button type="submit" className="btn-login">
                  Sign In
                </button>

                <p className="signup-link">
                  Don’t have an account?{" "}
                  <span className="signup-text" onClick={() => navigate("/register")}>
                    Sign Up
                  </span>
                </p>
              </form>

              <p className="server-msg">{msg}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
