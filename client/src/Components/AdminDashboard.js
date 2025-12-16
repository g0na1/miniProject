import React from "react";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Col, Button } from "reactstrap";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { isLogin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  ;

  if (!isLogin) return <p>Access Denied. Please login as admin.</p>;

  return (
    <div className="dashboard-page">
      <Container>
        <h2 className="dashboard-title">Welcome Ghosoon Alwaili</h2>
        <p className="dashboard-subtitle">Choose an option to manage the products</p>
<center>
        <Col className="dashboard-buttons .btn">
          <Col md="4" className="mb-3">
            <Button color="primary" onClick={() => navigate('/mcream')}>Manage Creams</Button>
          </Col>
          <Col md="4" className="mb-3">
            <Button color="success" onClick={() => navigate('/minc')}>Manage Incense</Button>
          </Col>
          <Col md="4" className="mb-3">
            <Button color="warning" onClick={() => navigate('/mperf')}>Manage Perfumes</Button>
          </Col>
         
        </Col>
        </center>

       
      </Container>
      <div>
       
      </div>
    </div>
  );
};

export default AdminDashboard;
