import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { expensesActions } from '../../ducks/expenses';
import { usersActions } from '../../ducks/users';
import AdminPage from './AdminPage';

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
    users: state.users,
    auth: state.auth,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    expensesActions: bindActionCreators(expensesActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
