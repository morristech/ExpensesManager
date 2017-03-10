const checkPassword = (password, errors) => {
  if (password && !/^[\\sa-zA-Z0-9]{8,30}$/.test(password)) {
    errors.message = 'Password must be 8 or more letters, numbers, or spaces.';
  }
};

module.exports = {
  user: values => {
    const errors = {};
    checkPassword(values.password, errors);
    return errors;
  }
};
