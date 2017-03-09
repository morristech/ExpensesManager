import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import { authActions } from '../../ducks/auth';
import { errorsActions } from '../../ducks/errors';

import TopBar from '../../components/TopBar/TopBar';
import AlertBar from '../../components/AlertBar/AlertBar';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
const App = (props) => {
  return (
    <div>
      <TopBar auth={props.auth} logout={props.authActions.logout} />
      <div className="container">
        <AlertBar error={props.errors} onDismiss={props.errorsActions.resetError} />
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string,
  authActions: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { auth: state.auth, errors: state.errors };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

