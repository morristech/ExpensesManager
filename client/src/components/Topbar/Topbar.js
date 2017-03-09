import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const TopBar = ({ auth, logout }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Expenses Manager</Link>
        </Navbar.Brand>
      </Navbar.Header>
      {auth.isLoggedIn &&
        <ul className="nav navbar-nav">
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      }
      {auth.isLoggedIn ?
        <Nav pullRight>
          <NavItem>Hello {auth.user.data.email}</NavItem>
          <NavItem onClick={logout}>Logout</NavItem>
        </Nav>
      :
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </Navbar>
  );
};

export default TopBar;
