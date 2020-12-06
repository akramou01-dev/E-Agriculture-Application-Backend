const { validationResult } = require("express-validator");
const create_and_throw_error = (err_msg, status_code, data) => {
  const error = new Error(err_msg);
  error.status_code = status_code;
  if (data) {
    error.data = data;
  }
  throw error;
};
const error_handler = (err, next) => {
  if (!err.status_code) {
    err.status_code = 500;
  }
  next(err);
};
const validation_errors_handler = (req) => {
  const errors = validationResult(req);
  // cheking the validation errors
  if (!errors.isEmpty()) {
    create_and_throw_error(
      errors.array()[0].msg,
      402,
      errors.array().length > 1 ? errors.array() : null
    );
  }
};

module.exports = {
  error_handler,
  validation_errors_handler,
  create_and_throw_error,
};
