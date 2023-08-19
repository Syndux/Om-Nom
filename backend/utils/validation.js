// backend/utils/validation.js
const { validationResult, check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validateLogin = [
  check("credential")
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .notEmpty()
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const validateSignup = [
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  check("username")
    .notEmpty().withMessage("Username is required.")
    .isAlphanumeric().withMessage("Username must consist of letters and numbers only.")
    .isLength({ min: 4 }).withMessage("Username must be at least 4 characters long.")
    .not().isEmail().withMessage("Username cannot be an email."),
  check('firstName')
    .notEmpty().withMessage('First name is required.')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long.'),
  check('lastName')
    .notEmpty().withMessage('Last name is required.')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long.'),
  check("password")
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateSignup,
};
