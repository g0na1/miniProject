import "./App.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Firstpage from "./Components/Firstpage";
import Login from "./Components/Login";
import Crem from "./Components/Crem";
import Ins from "./Components/Ins";
import Per from "./Components/Per";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import ManageCreams from "./Components/ManageCreams";
import ManagePerfumes from "./Components/ManagePerfumes";
import ManageIncense from "./Components/ManageIncense";
import Cart from "./Components/cart";
import Payment from "./Components/Payment";
import About from "./Components/About";
const App = () => {
  return (
    <Router>
      <Container fluid className="p-0">
      
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Firstpage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pre" element={<Per />} />
            <Route path="/cream" element={<Crem />} />
            <Route path="/ins" element={<Ins />} />
            <Route path="/admin" element={<AdminLogin/>} />
             <Route path="/admin-dashboard" element={<AdminDashboard/>} />
             <Route path="/mcream" element={<ManageCreams/>} />
             <Route path="/mperf" element={<ManagePerfumes/>} />
             <Route path="/minc" element={<ManageIncense/>} />
             <Route path="/cart" element={<Cart/>} />
             <Route path="/payment" element={<Payment/>} />
             <Route path="/about" element={<About/>} />
            
          </Routes>
        </div>

        <Footer />
      </Container>
    </Router>
  );
};

export default App;
