const router = require("express").Router();
const { verifyToken, verifyAdmin } = require("../../core/utils");
const { validationRules, validate } = require("./reservation.validation");
const controller = require("./reservations.controller");

/**
 * @swagger
 *   /api/reservations:
 *     post:
 *       tags:
 *       - Reservations
 *       description: Create reservation
 *       responses:
 *         201:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 */
router.post(
  "/",
  validationRules("create"),
  validate,
  verifyToken,
  controller.create
);

/**
 * @swagger
 *   /api/reservations:
 *     get:
 *       tags:
 *       - Reservations
 *       description: Get all reservations
 *       responses:
 *         200:
 *           description: Array with a list of all rooms
 *         401:
 *           description: Unauthorized
 */
router.get("/", verifyAdmin, controller.getAll);

/**
 * @swagger
 *   /api/reservations/{id}:
 *     get:
 *       tags:
 *       - Reservations
 *       description: Get reservation by id
 *       responses:
 *         200:
 *           description: Object with reservation properties
 *         401:
 *           description: Unauthorized
 */
router.get("/:id", verifyToken, controller.getOne);

/**
 * @swagger
 *   /api/reservations/{id}:
 *     put:
 *       tags:
 *       - Reservations
 *       description: Update reservation by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Reservations is not registered
 */
router.put("/:id", validationRules("create"), validate, controller.update);

/**
 * @swagger
 *   /api/reservations/{id}:
 *     delete:
 *       tags:
 *       - Reservations
 *       description: Delete reservation by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Reservation is not registered
 */
router.delete("/:id", verifyToken, controller.delete);

module.exports = router;
