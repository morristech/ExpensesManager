import React from 'react';
import ExpensesTableContainer from '../ExpensesTable/ExpensesTableContainer';


const ExpensesPage = () => {
  return (
    <div>
      <h2>My expenses</h2>
      <ExpensesTableContainer />
    </div>
  );
}

ExpensesPage.propTypes = {
};

export default ExpensesPage;
