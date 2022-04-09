const { validationResult, check } = require("express-validator");
/* const Schema = {
  _id: "",
  start_date:23/02/2001,
  end_date:24/02/2001,
  guest_count:2,
  total:23323,
  id_room:239232,
  id_guest:23092093
}; */

const validationRules = (method) => {
  switch (method) {
    case "create":
      return [
        check("start_date")
          .notEmpty()
          .withMessage("Cannot be empty")
          .isISO8601()
          .toDate()
          .withMessage("Must be a valid date"),
        check("end_date")
          .notEmpty()
          .withMessage("Cannot be empty")
          .isISO8601()
          .toDate()
          .withMessage("Must be a valid date"),
        check("guest_count")
          .isNumeric({ min: 1 })
          .withMessage("Must be a number"),
      ];
    case "update":
      return [];
    default:
      break;
  }
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
