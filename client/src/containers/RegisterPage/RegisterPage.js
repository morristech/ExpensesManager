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

class RegisterPage extends React.Component {

  componentWillMount() {
    // Redirect if already logged in
    if (this.props.auth.isLoggedIn) {
      this.props.handleRedirect();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Redirect if already logged in
    if (nextProps.auth.isLoggedIn) {
      this.props.handleRedirect();
    }
  }

  render() {
    const { touched, handleSubmit, error, auth } = this.props;
    return (
      <div className="container">
        <form
          className="col-md-6 col-md-offset-3 text-center"
          onSubmit={e => {e.preventDefault(); handleSubmit(e);}}
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

          <Field
            name="confirmPassword"
            component={({ input, label, type, meta: { touched, error, warning } }) => (
              <div>
                <input {...input} className="form-control" placeholder="Confirm Password" type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
              </div>
            )}
            type="password"
          />
          <br />

          <div>
            <Button
              className="btn-lg"
              disabled={auth.isFetching}
              type="submit"
            >
              {auth.isFetching ? 'Registrating...' : 'Register'}
            </Button>
          </div>

        </form>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  handleRedirect: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(authActions, dispatch),
  handleRedirect: () => {
    dispatch(push(ownProps.redirectTo || '/dashboard'));
  }
});

const validate = values => {
  const errors = {};
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match.';
  }
  return errors;
}

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'RegisterForm',
    validate,
    onSubmit: handleSubmit
  })(RegisterPage)
);
