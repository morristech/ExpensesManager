import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { usersActions } from '../../ducks/users';
import UsersTable from './UsersTable';

const handleSubmit = (values, dispatch) => {
  let roles;
  switch (values.roles) {
    case 'Admin':
      roles = ['user', 'manager', 'admin'];
      break;
    case 'Manager':
      roles = ['user', 'manager'];
      break;
    default:
      roles = ['user'];
  }

  if (values.id) {
    dispatch(usersActions.updateUser(values.id, values.email, roles));
  } else {
    dispatch(usersActions.createUser(values.email, values.password, roles));
  }
};

const mapStateToProps = state => {
  return {
    ...state.users,
    hasId: !!selector(state, 'id')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

// Selecting values from form
// http://redux-form.com/6.5.0/examples/selectingFormValues/
const UsersForm = reduxForm({
  form: 'UsersForm',
  validate: values => {
    const errors = {};
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match.';
    }
    return errors;
  },
  onSubmit: handleSubmit
})(UsersTable);
const selector = formValueSelector('UsersForm');

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm);
