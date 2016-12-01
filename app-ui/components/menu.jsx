import { Link } from 'react-router';
import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import LoginModal from './LoginModal.jsx';

class Menu extends Component {
  render() {
    return (
      <Navbar className="static-nav">
        <Navbar.Header>
          <Navbar.Toggle/>
          <p style={{"color": 'orange', "marginTop": '30%'}}> ADVENTURES</p>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <li>
              <LoginModal active="login">Login / Sign Up</LoginModal>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Menu;