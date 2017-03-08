import React from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Form, Field, initialize } from 'redux-form';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class ExpensesPage extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.actions.fetchExpenses();
  }

  render() {
    const { expenses, showingModal, actions, invalid, submitting, handleSubmit } = this.props;
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Comment</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(item =>
              <tr key={item.id}>
                <td>{item.datetime}</td>
                <td>{item.description}</td>
                <td>{item.comment}</td>
                <td>{item.amount}</td>
                <th>
                  <Button className="btn-xs" onClick={() => { this.props.dispatch(initialize('ExpensesForm', item)); actions.showModal();} }>Edit</Button>
                  <Button className="btn-xs" onClick={() => actions.deleteExpense(item.id)}>Delete</Button>
                </th>
              </tr>
            )}
          </tbody>
        </Table>

        <Button
          className="pull-right"
          bsStyle="primary"
          onClick={() => { this.props.dispatch(initialize('ExpensesForm', {})); actions.showModal(); }}
        >
          Add new expense
        </Button>

        <Modal show={showingModal} onHide={actions.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Expense Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={e => {e.preventDefault(); handleSubmit(e)}}
            >
              <Field
                name="id"
                component="input"
                type="hidden"
              />
              <br />

              <label>Date:</label>
              <Field
                name="datetime"
                className="form-control"
                component={props => <DateTime
                  inputProps={ {name: 'datetime'} }
                  value={props.input.value}
                  onChange={param => props.input.onChange(param)}
                />}
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
                required
              />
              <br />

              <label>Amount in dollars:</label>
              <Field
                name="amount"
                className="form-control"
                component="input"
                type="number"
                placeholder="Amount in dollars"
                required
              />
              <br />

              <div>
                <Button
                  bsStyle="primary"
                  className="btn-lg"
                  disabled={invalid || submitting}
                  type="submit"
                >
                  {submitting ? 'Updating...' : 'Submit'}
                </Button>
              </div>

            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ExpensesPage;
