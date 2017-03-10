import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertBar = ({ error, onDismiss }) => {
  return (
    <div>
      {error && <Alert style={styles.onTop} bsStyle="danger" onDismiss={onDismiss}>
        <p>{error}</p>
      </Alert>}
    </div>
  );
};

const styles = {
  onTop: {
    position: 'fixed',
    top: 50,
    left: 50,
    width: '90%',
    zIndex: 9999
  }
};

AlertBar.propTypes = {
  onDismiss: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};

export default AlertBar;
