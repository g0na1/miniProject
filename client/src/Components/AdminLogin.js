import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../Features/AdminSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, msg } = useSelector((state) => state.admin);

 const onSubmit = (data) => {
  dispatch(loginAdmin({
    email: data.email.trim(), 
    password: data.password
  }));
};

  React.useEffect(() => {
    if (isLogin) navigate("/admin-dashboard");
  }, [isLogin, navigate]);

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md="6" lg="5">
            <div className="login-card">
              <h2 className="login-title">Admin Panel</h2>
              <p className="login-subtitle">Sign in as administrator</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    {...register("password")}
                  />
                </div>

                <button type="submit" className="btn-login">Sign In</button>
              </form>

              {msg && <p className="server-msg">{msg}</p>}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
