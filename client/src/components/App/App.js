import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React-Bootstrap</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem><Link to="expenses">My Expenses</Link></NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
