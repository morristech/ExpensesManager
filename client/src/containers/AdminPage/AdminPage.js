import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

import ExpensesTable from '../ExpensesTable/ExpensesTableContainer';
import UsersTable from '../UsersTable/UsersTableContainer';

class AdminPage extends React.Component {

  componentDidMount() {
    // Fetch expenses of everyone only if the user is an admin
    if (this.props.auth.user.data.roles.indexOf('admin') >= 0) {
      this.props.expensesActions.fetchAllExpenses();
    }
    this.props.usersActions.fetchUsers();
  }

  render() {
    const { expenses, users, auth } = this.props;

    return (
      <div>
        {auth.user.data.roles.indexOf('admin') >= 0 && <div>
          <h2>All expenses</h2>
          <ExpensesTable allExpenses />
        </div>}

        <h2>All users</h2>
        <UsersTable />
      </div>
    );
  }
}

AdminPage.propTypes = {
  expenses: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  expensesActions: React.PropTypes.object.isRequired,
  usersActions: React.PropTypes.object.isRequired,
};

export default AdminPage;
