const { getUserID } = require("../../core/utils");
const Reservation = require("./reservation.model");

//Validation here
const Controller = {
  getAll: (req, res) => {
    const reservation = new Reservation();
    reservation.getAll().then((results) => {
      res.send(results);
    });
  },
  getOne: (req, res) => {
    const reservation = new Reservation();
    let id = req.params.id;
    reservation.getOne(id).then((results) => {
      res.send(results);
    });
  },
  create: async (req, res) => {
    const { start_date, end_date, guest_count, total, id_room } = req.body;
    const id_guest = await getUserID(req);
    const reservation = new Reservation();
    const status = "active";
    reservation
      .create({
        start_date,
        end_date,
        guest_count,
        total,
        id_room,
        id_guest,
        status,
      })
      .then((results) => {
        res.status(results.code).json(results.message);
      });
  },
  update: (req, res) => {
    const reservation = new Reservation();
    const {
      start_date,
      end_date,
      guest_count,
      total,
      id_room,
      id_guest,
      status,
    } = req.body;
    let newData = {
      start_date,
      end_date,
      guest_count,
      total,
      id_room,
      id_guest,
      status,
    };

    let id = req.params.id;
    reservation.update(id, newData).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
  delete: (req, res) => {
    const reservation = new Reservation();
    let id = req.params.id;
    reservation.delete(id).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
};

module.exports = Controller;
