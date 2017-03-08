import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import { feathersAuthentication } from '../../feathers';

// TODO Put into saga
const handleSubmit = (values, dispatch) => new Promise((resolve, reject) => {
  dispatch(feathersAuthentication.authenticate(
    { type: 'local', email: values.email, password: values.password }
  ))
    .then(() => resolve())
    .catch(err => console.err(err));
});


class Form extends React.Component {
  componentWillMount() {
    this.props.handleLogout();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) { // true after successful submit
      this.props.handleRedirect();
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

    return (
      <div className="container">

        <form onSubmit={handleSubmit} className="col-md-6 col-md-offset-3 text-center">
          <h2>Sign In</h2>
          <Field
            name="email"
            className="form-control"
            component="input"
            type="email"
            placeholder="Email"
          />
          <br />

          <Field
            name="password"
            className="form-control"
            component="input"
            type="password"
            placeholder="Password"
          />
          <br />

          <div>
            <Button
              className="btn-lg"
              disabled={invalid || submitting}
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
  isAuthenticated: state.auth.isSignedIn,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogout: () => {
    dispatch(feathersAuthentication.logout());
  },
  handleRedirect: () => {
    dispatch(push(ownProps.redirectTo || '/'));
  },
});

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'Login',
    // initialValues: { email: 'a@a.com' }, // set initialValues in mapStateToProps for dynamic data
    // validate: usersClientValidations.signin,
    // asyncBlurFields: ['email', 'password'],
    // asyncValidate: (values, dispatch, props) => new Promise(...),
    onSubmit: handleSubmit,
  })(Form)
);
