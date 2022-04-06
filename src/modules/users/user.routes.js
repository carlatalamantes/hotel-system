const router = require("express").Router();
const controller = require("./users.controller");
const { validationRules, validate } = require("./user.validation");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validationRules(), validate, controller.create);
router.post("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/login", controller.login);

module.exports = router;
