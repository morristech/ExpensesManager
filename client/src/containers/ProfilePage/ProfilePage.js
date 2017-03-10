import React from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { push } from 'react-router-redux';

import { usersActions } from '../../ducks/users';

function handleSubmit(values, dispatch) {
  // redirect to dashboard after setting password
  return dispatch(usersActions.updateUserPassword(null, values.password)); // null means updating the user himself
}

class ProfilePage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.users.isFetching && !nextProps.users.isFetching) {
      this.props.dispatch(push('/dashboard'));
    }
  }

  render() {
    const { handleSubmit, users } = this.props;
    return (
      <div className="container">
        <form
          className="col-md-6 col-md-offset-3 text-center"
          onSubmit={e => {e.preventDefault(); handleSubmit(e);}}
        >
          <h2>Change password</h2>

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
                <input {...input} className="form-control" placeholder="Confirm Password" type={type} label={label}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
              </div>
            )}
            type="password"
            required
          />
          <br />

          <div>
            <Button
              className="btn-lg"
              disabled={users.isFetching}
              type="submit"
            >
              {users.isFetching ? 'Changing...' : 'Change'}
            </Button>
          </div>

        </form>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  actions: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(usersActions, dispatch)
});

// decorate with redux
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'ChangePasswordForm',
    validate: values => {
      const errors = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match.';
      }
      return errors;
    },
    onSubmit: handleSubmit
  })(ProfilePage)
);
