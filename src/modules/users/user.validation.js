const { body, validationResult, check } = require("express-validator");
/* const Schema = {
  _id: "",
  name: "",
  first_lastname: "",
  second_lastname: "",
  cellphone: "",
  email: "",
  password: "",
  role: "user",
  reservations: [],
}; */
const validationRules = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isString()
      .withMessage("Must be a string"),
    check("first_lastname")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isString()
      .withMessage("Must be a string"),
    check("second_lastname").isString().withMessage("Must be a string"),
    check("cellphone")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isString()
      .withMessage("Must be a string"),
    check("email")
      .isEmail()
      .withMessage("Must be a valid email")
      .notEmpty()
      .withMessage("Cannot be empty"),
    check("password")
      .isLength({ min: 4 })
      .withMessage("Must be at least 4 chars"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.errors.map((err) =>
    extractedErrors.push({ param: err.param, msg: err.msg })
  );

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { validationRules, validate };
