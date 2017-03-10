import React from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { Field, initialize } from 'redux-form';
import moment from 'moment';

class UsersTable extends React.Component {

  componentDidMount() {
    this.props.actions.fetchUsers();
  }

  render() {
    const { users, showingModal, hasId, actions, isFetching, handleSubmit } = this.props;

    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Created At</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(item =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.roles.join(', ')}</td>
                <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                <td>
                  <Button className="btn-xs" onClick={() => { this.props.dispatch(initialize('UsersForm', item)); actions.showModal();}}>Edit</Button>
                  <Button className="btn-xs" onClick={() => actions.deleteUser(item.id)}>Delete</Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Button
          className="pull-right"
          bsStyle="primary"
          onClick={() => { this.props.dispatch(initialize('UsersForm', {})); actions.showModal(); }}
        >
          Add new user
        </Button>

        <Modal show={showingModal} onHide={actions.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>User Information</Modal.Title>
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

              <label>Email:</label>
              <Field
                name="email"
                className="form-control"
                component="input"
                type="email"
                placeholder="Email"
                required
              />
              <br />

              {!hasId && <div>
                <label>Password:</label>
                <Field
                  name="password"
                  className="form-control"
                  component="input"
                  type="password"
                  placeholder="Password"
                  required
                />
                <br />

                <label>Confirm Password:</label>
                <Field
                  name="confirmPassword"
                  component={({ input, label, type, meta: { touched, error, warning } }) => (
                    <div>
                      <input {...input} className="form-control" placeholder="Confirm Password" type={type} label={label}/>
                      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                    </div>
                  )}
                  type="password"
                />
                <br />
              </div>}

              <label>Roles:</label>
              <Field
                name="roles"
                component={({input, options}) => (
                  <select className="form-control" {...input}>
                    {options.map(option =>
                      <option key={option} value={option}>{option}</option>
                    )}
                  </select>
                )}
                options={['User', 'Manager', 'Admin']}
              />
              <br />

              <div>
                <Button
                  bsStyle="primary"
                  className="btn-lg"
                  disabled={isFetching}
                  type="submit"
                >
                  {isFetching ? 'Updating...' : 'Submit'}
                </Button>
              </div>

            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

UsersTable.propTypes = {
  input: React.PropTypes.object,
  options: React.PropTypes.array,
  meta: React.PropTypes.object,
  hasId: React.PropTypes.bool,
  actions: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  showingModal: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default UsersTable;
