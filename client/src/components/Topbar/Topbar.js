import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const Topbar = (auth) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
      </Navbar.Header>
      {auth.loggedIn ?
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Logout</NavItem>
        </Nav>
      :
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Register</NavItem>
          <NavItem eventKey={1} href="#">Login</NavItem>
        </Nav>
      }
    </Navbar>
  );
};

export default Topbar;
