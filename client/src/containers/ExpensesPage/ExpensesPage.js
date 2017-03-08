import React from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Field } from 'redux-form';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const ExpensesPage = ({ expenses, showingModal, actions, invalid, submitting, handleSubmit }) => {
  return (
    <div>
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
          {expenses.map(item =>
            <tr key={item.id}>
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

      <Button
        className="pull-right"
        bsStyle="primary"
        onClick={actions.showModal}
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
                {submitting ? 'Updating...' : 'Add new expense'}
              </Button>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExpensesPage;
