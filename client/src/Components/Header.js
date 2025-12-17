import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import user from "../Images/user.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // تأكد من تثبيت Font Awesome
import "./header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <Navbar expand="md" className="header">
      <Col>
        <Row className="w-100 align-items-center"> 
          <Col xs="auto">
            <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle nav>
                <img src={user} className="profile-logo" alt="User Profile" />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem header>Your Profile</DropdownItem>
                <DropdownItem>
                  <Link to="/about" className="dropdown-link">about us</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/" className="dropdown-link">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>

=          <Col>
            <Nav className="mx-auto">
              <NavItem className="mx-3">
                <Link to="/pre" className="nav-link">Perfumes</Link>
              </NavItem>
              <NavItem className="mx-3">
                <Link to="/cream" className="nav-link">Creams</Link>
              </NavItem>
              <NavItem className="mx-3">
                <Link to="/ins" className="nav-link">Incense</Link>
              </NavItem>
            </Nav>
          </Col>

          <Col xs="auto" className="cart-icon">
            <Link to="/cart" className="nav-link">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </Col>
        </Row>
      </Col>
    </Navbar>
  );
};

export default Header;