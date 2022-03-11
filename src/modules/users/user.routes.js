const router = require("express").Router();
const controller = require("./users.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.post("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/login", controller.login);

module.exports = router;
