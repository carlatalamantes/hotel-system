const router = require("express").Router();

const userRoutes = require("./../modules/users/user.routes");
const roomRoutes = require("./../modules/rooms/room.routes");
const reservationRoutes = require("./../modules/reservations/reservation.routes");

router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/reservations", reservationRoutes);

module.exports = router;
