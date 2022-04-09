const { validationResult, check } = require("express-validator");
/* const Schema = {
  _id: "",
  name: "",
  building:"",
  exterior_number:"",
  bed_count:1,
  guest_count:2,
  services:["minibar"],
  imgs:[""],
  nightly_price:5600,
  reviews:[]
}; */
const validationRules = (method) => {
  switch (method) {
    case "create":
      return [
        check("name")
          .notEmpty()
          .withMessage("Cannot be empty")
          .isString()
          .withMessage("Must be a string"),
        check("building").optional().isString().withMessage("Must be a string"),
        check("exterior_number")
          .optional()
          .isString()
          .withMessage("Must be a string"),
        check("bed_count")
          .isNumeric({ min: 1 })
          .withMessage("Must be a number"),
        check("guest_count")
          .isNumeric({ min: 2 })
          .withMessage("Must be a number"),
        check("nightly_price")
          .isNumeric({ min: 1 })
          .withMessage("Must be a number"),
        check("services")
          .isIn([
            "kitchen",
            "tv",
            "hair dryer",
            "toiletries ",
            "breakfast",
            "mini bar",
            "safe",
          ])
          .withMessage(
            "Services must be kitchen | tv | hair dryer | toiletries | breakfast | mini bar | safe "
          ),
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
