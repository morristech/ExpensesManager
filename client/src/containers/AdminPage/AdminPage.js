import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

class AdminPage extends React.Component {

  componentDidMount() {
    // Fetch expenses of everyone only if the user is an admin
    if (this.props.auth.user.data.roles.indexOf('admin') >= 0) {
      this.props.expensesActions.fetchAllExpenses();
    }
    this.props.usersActions.fetchAllUsers();
  }

  render() {
    const { expenses, users, auth } = this.props;

    return (
      <div>
        {auth.user.data.roles.indexOf('admin') >= 0 && <div>
          <h2>All expenses</h2>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Comment</th>
                <th>Amount</th>
                <th>UserId</th>
              </tr>
            </thead>
            <tbody>
              {expenses.expenses.map(item =>
                <tr key={item.id}>
                  <td>{moment(item.datetime).format('MMMM Do YYYY, h:mm a')}</td>
                  <td>{item.description}</td>
                  <td>{item.comment}</td>
                  <td>${item.amount}</td>
                  <td>{item.userId}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>}

        <h2>All users</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.users.map(item =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.roles.join(',')}</td>
                <td>{item.createdAt}</td>
              </tr>
            )}
          </tbody>
        </Table>
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
