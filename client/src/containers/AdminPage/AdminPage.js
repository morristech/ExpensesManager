import React from 'react';
import { Table, Button, Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.expensesActions.fetchAllExpenses();
    this.props.usersActions.fetchAllUsers();
  }

  render() {
    const { expenses, users } = this.props;

    return (
      <div>
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
                <td>{item.amount}</td>
                <td>{item.userId}</td>
              </tr>
            )}
          </tbody>
        </Table>

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

export default AdminPage;
