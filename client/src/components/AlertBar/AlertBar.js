import React from 'react';
import { Alert } from 'react-bootstrap';

const TopBar = ({ error, onDismiss }) => {
  return (
    <div>
      {error && <Alert bsStyle="danger" onDismiss={onDismiss}>
        <p>{error}</p>
      </Alert>}
    </div>
  );
};

export default TopBar;
