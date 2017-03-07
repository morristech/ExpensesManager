import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { expensesActions } from '../../ducks/expenses';

export const ExpensesPage = (props) => {
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Comment</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.expenses.map(item =>
          <tr>
            <td>{item.datetime}</td>
            <td>{item.description}</td>
            <td>{item.comment}</td>
            <td>{item.amount}</td>
          </tr>
        )}
        <tr>
          <td>something</td>
          <td>something</td>
          <td>something</td>
          <td>something</td>
        </tr>
      </tbody>
    </Table>
  );
};

ExpensesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  expenses: PropTypes.array.isRequired,
};

const mapStateToProps = state => state.expenses;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(expensesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesPage);
