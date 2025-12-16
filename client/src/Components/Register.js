import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import { userSchemaValidation } from "../Validations/UserValidations";
import "./Login.css"; // استخدم نفس CSS الخاص بالـ Login

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, msg } = useSelector(state => state.users);
  const [successMsg, setSuccessMsg] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = (data) => {
    const { name, email, password } = data;
    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (status === "success") {
      setSuccessMsg(msg || "Registration successful!");
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status, msg, navigate]);

  return (
    <div className="login-page"> {/* استخدام نفس تصميم Login */}
      <Container>
        <Row className="justify-content-center">
          <Col md="6" lg="5">
            <div className="login-card">
              <h2 className="login-title">Create Account</h2>
              <p className="login-subtitle">Join us to get started</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your name..."
                    {...register("name")}
                  />
                  <p className="error">{errors.name?.message}</p>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your email..."
                    {...register("email")}
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Enter your password..."
                    {...register("password")}
                  />
                  <p className="error">{errors.password?.message}</p>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Confirm your password..."
                    {...register("confirmPassword")}
                  />
                  <p className="error">{errors.confirmPassword?.message}</p>
                </div>

                <button type="submit" className="button">
                  Register
                </button>
              </form>

              {successMsg && <p className="success-msg">{successMsg}</p>}
              {status === "rejected" && <p className="error-msg">{msg}</p>}

              <p className="signup-link">
                Already have an account?{" "}
                <span className="signup-text" onClick={() => navigate("/login")}>
                  Sign In
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
