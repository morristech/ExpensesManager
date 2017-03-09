import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { expensesActions } from '../../ducks/expenses';
import { usersActions } from '../../ducks/users';
import AdminPage from './AdminPage';

AdminPage.propTypes = {
  expensesActions: PropTypes.object.isRequired,
  usersActions: PropTypes.object.isRequired,
  expenses: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

const handleSubmit = (values, dispatch) => {
  if (values.id) {
    dispatch(expensesActions.updateExpense(values.id, values.datetime, values.description, values.comment, values.amount));
  } else {
    dispatch(expensesActions.createExpense(values.datetime, values.description, values.comment, values.amount));
  }
};

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
    users: state.users
  };
};

function mapDispatchToProps(dispatch) {
  return {
    expensesActions: bindActionCreators(expensesActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
