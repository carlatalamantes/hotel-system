const router = require("express").Router();
const controller = require("./users.controller");
const { validationRules, validate } = require("./user.validation");
const { verifyToken } = require("../../core/utils");

router.get("/", controller.getAll);
router.get("/:id", verifyToken, controller.getOne);
router.post("/", validationRules("create"), validate, controller.create);
router.post("/login", validationRules("login"), validate, controller.login);
router.put("/:id", verifyToken, controller.update);
router.delete("/:id", verifyToken, controller.delete);

module.exports = router;
