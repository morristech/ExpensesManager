const checkDatetime = (datetime, errors) => {
  if (!/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/.test(datetime)) {
    errors.message = 'The date and time are not valid.';
  }
};

module.exports = {
  expense: values => {
    const errors = {};
    checkDatetime(values.datetime, errors);
    return errors;
  }
};
