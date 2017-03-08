import React from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { authActions } from '../../ducks/auth';

function handleSubmit(values, dispatch) {
  return dispatch(authActions.registerRequest(values.email, values.password));
}

class LoginPage extends React.Component {

  componentWillMount() {
    // Redirect if already logged in
    if (this.props.auth.isLoggedIn) {
      this.props.handleRedirect();
    }
  }

  render() {
    const { handleSubmit, submitting, invalid } = this.props;
    return (
      <div className="container">
        <form
          className="col-md-6 col-md-offset-3 text-center"
          onSubmit={e => {e.preventDefault(); handleSubmit(e)}}
        >
          <h2>Register</h2>
          <Field
            name="email"
            className="form-control"
            component="input"
            type="email"
            placeholder="Email"
            required
          />
          <br />

          <Field
            name="password"
            className="form-control"
            component="input"
            type="password"
            placeholder="Password"
            required
          />
          <br />

          <div>
            <Button
              className="btn-lg"
              disabled={invalid || submitting}
              type="submit"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>

        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(authActions, dispatch),
  handleRedirect: () => {
    dispatch(push(ownProps.redirectTo || '/'));
  }
});

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'RegisterForm',
    onSubmit: handleSubmit
  })(LoginPage)
);
