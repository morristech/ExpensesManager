import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const Topbar = (auth, logout) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Expenses Manager</Link>
        </Navbar.Brand>
      </Navbar.Header>
      {auth.loggedIn ?
        <Nav pullRight>
          <NavItem onClick={logout}>Logout</NavItem>
        </Nav>
      :
        <Nav pullRight>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </Nav>
      }
    </Navbar>
  );
};

export default Topbar;
