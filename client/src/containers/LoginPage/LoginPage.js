import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

import { expensesActions } from '../../ducks/expenses';

class LoginPage extends React.Component {
  render() {
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
      </Table>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.array.isRequired,
};

const mapStateToProps = state => state.auth;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(expensesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
