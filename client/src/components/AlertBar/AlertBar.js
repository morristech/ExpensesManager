import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertBar = ({ error, onDismiss }) => {
  return (
    <div>
      {error && <Alert bsStyle="danger" onDismiss={onDismiss}>
        <p>{error}</p>
      </Alert>}
    </div>
  );
};

AlertBar.propTypes = {
  onDismiss: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};

export default AlertBar;
