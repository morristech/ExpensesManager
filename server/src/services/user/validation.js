const checkPassword = (password, errors) => {
  if (!/^[\\sa-zA-Z]{8,30}$/.test((password).trim())) {
    errors['message'] = 'Password must be 8 or more letters or spaces.';
  }
};

module.exports = {
  user: values => {
    const errors = {};
    checkPassword(values.password, errors);
    return errors;
  }
};
