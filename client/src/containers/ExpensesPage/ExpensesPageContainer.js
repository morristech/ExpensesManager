import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { expensesActions } from '../../ducks/expenses';
import ExpensesPage from './ExpensesPage';

ExpensesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  expenses: PropTypes.array.isRequired,
};

const handleSubmit = (values, dispatch) => {
  dispatch(expensesActions.addExpense(values.date, values.description, values.comment, values.amount))
}

const mapStateToProps = state => state.expenses;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(expensesActions, dispatch)
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
  })(ExpensesPage)
);
