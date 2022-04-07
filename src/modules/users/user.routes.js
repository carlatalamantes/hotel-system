const router = require("express").Router();
const controller = require("./users.controller");
const { validationRules, validate } = require("./user.validation");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validationRules("create"), validate, controller.create);
router.post("/login", validationRules("login"), validate, controller.login);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
