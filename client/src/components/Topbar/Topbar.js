import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

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
          {(auth.user.data.roles.indexOf('manager') >= 0 || auth.user.data.roles.indexOf('admin') >= 0) &&
            <li><Link to="/admin">Admin</Link></li>
          }
        </ul>
      }
      {auth.isLoggedIn ?
        <Nav pullRight>
          <NavDropdown eventKey={3} title={auth.user.data.email} id="profile-nav-dropdown">
            <li><Link to="/profile">Profile</Link></li>
            <MenuItem divider />
            <MenuItem eventKey={3.3} onClick={logout}>Logout</MenuItem>
          </NavDropdown>
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

TopBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default TopBar;
