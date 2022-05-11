const router = require("express").Router();
const controller = require("./users.controller");
const { validationRules, validate } = require("./user.validation");
const { verifyToken, verifyAdmin } = require("../../core/utils");

/**
 * @swagger
 *   /api/users:
 *     get:
 *       tags:
 *       - Users
 *       description: Get all users
 *       responses:
 *         200:
 *           description: Array with a list of all users
 *         401:
 *           description: Unauthorized
 */
router.get("/", verifyAdmin, controller.getAll);

/**
 * @swagger
 *   /api/users/{id}:
 *     get:
 *       tags:
 *       - Users
 *       description: Get user by id
 *       responses:
 *         200:
 *           description: Object with user properties
 *         401:
 *           description: Unauthorized
 */
router.get("/:id", controller.getOne);

/**
 * @swagger
 *   /api/users/:
 *     post:
 *       tags:
 *       - Users
 *       description: Register user
 *       responses:
 *         201:
 *           description: Confirmation message
 *         422:
 *           description: User already exists
 */
router.post("/", validationRules("create"), validate, controller.create);

/**
 * @swagger
 *   /api/users/login:
 *     post:
 *       tags:
 *       - Users
 *       description: Register user
 *       responses:
 *         200:
 *           description: Object with token
 *         403:
 *           description: Wrong email or/and password
 *         404:
 *           description: User is not registered
 */
router.post("/login", validationRules("login"), validate, controller.login);

/**
 * @swagger
 *   /api/users/{id}:
 *     put:
 *       tags:
 *       - Users
 *       description: Update user by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: User is not registered
 */
router.put(
  "/:id",
  verifyToken,
  validationRules("update"),
  validate,
  controller.update
);

/**
 * @swagger
 *   /api/users/{id}:
 *     delete:
 *       tags:
 *       - Users
 *       description: Delete user by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: User is not registered
 */
router.delete("/:id", verifyToken, controller.delete);

/**
 * @swagger
 *   /api/users/{id}/reservations:
 *     get:
 *       tags:
 *       - Users
 *       description: Get all reservations of specific user
 *       responses:
 *         200:
 *           description: Array with all reservations of specific user
 *         401:
 *           description: Unauthorized
 */
router.get("/:id/reservations", controller.res);

module.exports = router;
