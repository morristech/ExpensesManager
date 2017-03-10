import React from 'react';
import { Link } from 'react-router';
import { Navbar, MenuItem} from 'react-bootstrap';

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
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/Profile">{auth.user.data.email}</Link></li>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </ul>
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
