import React from 'react';
import ExpensesTableContainer from '../../containers/ExpensesTable/ExpensesTableContainer';


const Dashboard = () => {
  return (
    <div>
      <h2>My expenses</h2>
      <ExpensesTableContainer />
    </div>
  );
}

Dashboard.propTypes = {
};

export default Dashboard;
