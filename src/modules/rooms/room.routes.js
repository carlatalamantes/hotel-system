const router = require("express").Router();
const { verifyAdmin } = require("../../core/utils");
const { validate, validationRules } = require("./room.validation");
const controller = require("./rooms.controller");
const upload = require("../../core/multer");

/**
 * @swagger
 *   /api/rooms:
 *     get:
 *       tags:
 *       - Rooms
 *       description: Get all rooms
 *       responses:
 *         200:
 *           description: Array with a list of all rooms
 *         401:
 *           description: Unauthorized
 */
router.get("/", controller.getAll);

/**
 * @swagger
 *   /api/rooms:
 *     post:
 *       tags:
 *       - Rooms
 *       description: Create room
 *       responses:
 *         201:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         422:
 *           description: Room already exists
 */

router.post(
  "/",
  verifyAdmin,
  validationRules("create"),
  validate,
  controller.create
);

/**
 * @swagger
 *   /api/rooms/{id}:
 *     get:
 *       tags:
 *       - Rooms
 *       description: Get room by id
 *       responses:
 *         200:
 *           description: Object with room properties
 *         401:
 *           description: Unauthorized
 */
router.get("/:id", controller.getOne);

/**
 * @swagger
 *   /api/rooms/{id}:
 *     delete:
 *       tags:
 *       - Rooms
 *       description: Delete room by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Room is not registered
 */
router.delete("/:id", verifyAdmin, controller.delete);

/**
 * @swagger
 *   /api/rooms/{id}:
 *     put:
 *       tags:
 *       - Rooms
 *       description: Update room by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Room is not registered
 */
router.put(
  "/:id",
  verifyAdmin,
  validationRules("create"),
  validate,
  controller.update
);

/**
 * @swagger
 *   /api/rooms/{id}/photo:
 *     post:
 *       tags:
 *       - Rooms
 *       description: Upload room photo by id
 *       responses:
 *         200:
 *           description: Confirmation message
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Room is not registered
 */
router.post("/:id/photo", upload.single("image"), controller.uploadPhoto);
module.exports = router;
