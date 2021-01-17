import React,{useState} from "react";
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {logout} from '../actions/userActions';
const Header = () => {
  const dispatch=useDispatch();
  const userLogin=useSelector((state)=>state.userLogin);
  // const userInfo=localStorage.getItem('userInfo');
  const {userInfo}=userLogin
  const logoutHandler=()=>{
   dispatch(logout())
   
  }
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand style={{ color: "green" }}>
              Pick Nature <i class="fab fa-canadian-maple-leaf"></i>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"> </i>&nbsp; Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>&nbsp;Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
