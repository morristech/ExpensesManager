import React from 'react';
import { Table, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import { Field, initialize } from 'redux-form';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import _ from 'lodash';


/**
 * Render a select input with all users as options
 */
const renderUsersList = ({input, options, meta: {touched, error}}) => (
  <select className='form-control' {...input}>
      <option></option>
    {options.map(option =>
      <option key={option.id} value={option.id}>{option.email}</option>
    )}
  </select>
);

class ExpensesTable extends React.Component {

  componentDidMount() {
    if (this.props.allExpenses) {
      this.props.expensesActions.fetchAllExpenses();
      this.props.usersActions.fetchUsers(); // for creating a new expense and assigning to a user
    } else {
      this.props.expensesActions.fetchExpenses();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Test if we just fetched some new expenses data
    if (this.props.expenses.isFetching && !nextProps.expenses.isFetching) {
      this.componentDidMount();
    }
  }

  render() {
    const { expenses, expensesActions, handleSubmit } = this.props;

    /**
     * Helper function to filter the expenses matching the string filter
     * @param  {Object} item Each item of the expenses array to be filtered
     * @return {array}       The resulting filtered array
     */
    const filterItems = item => {
      if (!expenses.filter) {
        return true;
      }
      const lowercaseFilter = expenses.filter.toLowerCase();
      console.log(item)
      return (
        moment(item.datetime).format('MMMM Do YYYY, h:mm a').toLowerCase().indexOf(lowercaseFilter) >= 0 ||
        item.description.toLowerCase().indexOf(lowercaseFilter) >= 0 ||
        (item.comment || '').toLowerCase().indexOf(lowercaseFilter) >= 0 ||
        item.amount.toString().toLowerCase().indexOf(lowercaseFilter) >= 0
      );
    };

    // The next few lines generate a derived expenses array with expenses grouped by week with their week sum
    // First, all expenses grouped by week
    const expensesByWeek = _.groupBy(expenses.expenses, item => moment(item.datetime).startOf('isoWeek')); // TODO Deprecation warning in console
    // Next we calculate sum and average of each week and return a nice array
    const expensesDerived = Object.keys(expensesByWeek).map(week => {
      let sum = 0;
      for (let i = 0; i < expensesByWeek[week].length; i++) {
        sum += Number.parseFloat(expensesByWeek[week][i].amount);
      }
      return {
        week,
        sum,
      };
    });

    return (
      <div>
        <Tabs animation={false} id="expenses-tabs">
          <Tab eventKey={1} title="All expenses">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  {this.props.allExpenses && <th>UserId</th>}
                  <th>Date</th>
                  <th>Description</th>
                  <th>Comment</th>
                  <th>Amount</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {expenses.expenses.filter(filterItems).map(item =>
                  <tr key={item.id}>
                    {this.props.allExpenses && <td>{item.userId}</td>}
                    <td>{moment(item.datetime).format('MMMM Do YYYY, h:mm a')}</td>
                    <td>{item.description}</td>
                    <td>{item.comment}</td>
                    <td>${Number(item.amount).toFixed(2)}</td>
                    <td>
                      <Button className="btn-xs" onClick={() => { this.props.dispatch(initialize('ExpensesForm', item)); expensesActions.showModal();}}>Edit</Button>
                      <Button className="btn-xs" onClick={() => expensesActions.deleteExpense(item.id)}>Delete</Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <label>Filter expenses: </label>
            <input value={expenses.filter} onChange={e => expensesActions.setFilter(e.target.value)} />

            <Button
              className="pull-right"
              bsStyle="primary"
              onClick={() => { this.props.dispatch(initialize('ExpensesForm', {})); expensesActions.showModal(); }}
            >
              Add new expense
            </Button>
          </Tab>
          <Tab eventKey={2} title="Overview by week">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Total spent</th>
                  <th>Average per day</th>
                </tr>
              </thead>
              <tbody>
                {expensesDerived.map(item =>
                  <tr key={item.week}>
                    <td>Week of Monday {moment(item.week).format('MMMM Do YYYY')}</td>
                    <td>${item.sum.toFixed(2)}</td>
                    <td>${(item.sum / 7).toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        <Modal show={expenses.showingModal} onHide={expensesActions.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Expense Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={e => {e.preventDefault(); handleSubmit(e);}}
            >
              <Field
                name="id"
                component="input"
                type="hidden"
              />
              <br />

              {this.props.allExpenses && <div>
                <label>Assign to user (leave blank for self):</label>
                <Field
                  name="userId"
                  className="form-control"
                  component={renderUsersList}
                  type="number"
                  placeholder="User"
                  options={this.props.users.users}
                />
                <br />
              </div>}

              <label>Date:</label>
              <Field
                name="datetime"
                className="form-control"
                component={props => <DateTime
                  inputProps={{name: 'datetime'}}
                  value={props.input.value}
                  onChange={param => props.input.onChange(param)}
                />}
                type="datetime"
                placeholder="Date & Time"
                required
              />
              <br />

              <label>Description:</label>
              <Field
                name="description"
                className="form-control"
                component="input"
                type="text"
                placeholder="Description"
                required
              />
              <br />

              <label>Comment:</label>
              <Field
                name="comment"
                className="form-control"
                component="input"
                type="text"
                placeholder="Comment"
              />
              <br />

              <label>Amount in dollars:</label>
              <Field
                name="amount"
                className="form-control"
                component="input"
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount in dollars"
                required
              />
              <br />

              <div>
                <Button
                  bsStyle="primary"
                  className="btn-lg"
                  disabled={expenses.isFetching}
                  type="submit"
                >
                  {expenses.isFetching ? 'Updating...' : 'Submit'}
                </Button>
              </div>

            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ExpensesTable.propTypes = {
  allExpenses: React.PropTypes.bool,
  expensesActions: React.PropTypes.object.isRequired,
  expenses: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default ExpensesTable;
