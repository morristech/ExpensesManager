import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import Topbar from '../../components/Topbar/Topbar';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
const App = (props) => {
  return (
    <div>
      <Topbar auth={props.auth} />
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element,
  // actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(authActions, dispatch)
//   };
// };

export default connect(
  mapStateToProps,
  null,// mapDispatchToProps,
)(App);

