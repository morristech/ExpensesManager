import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { expensesActions } from '../../ducks/expenses';
import { usersActions } from '../../ducks/users';
import ExpensesTable from './ExpensesTable';

const handleSubmit = (values, dispatch) => {
  if (values.id) {
    dispatch(expensesActions.updateExpense(values.id, values.datetime, values.description, values.comment, values.amount, values.userId));
  } else {
    dispatch(expensesActions.createExpense(values.datetime, values.description, values.comment, values.amount, values.userId));
  }
};

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
    users: state.users,
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
)(
  // decorate react component with redux-form
  reduxForm({
    form: 'ExpensesForm',
    onSubmit: handleSubmit
  })(ExpensesTable)
);
