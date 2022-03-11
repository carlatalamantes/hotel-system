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
  create: (req, res) => {
    const reservation = new Reservation();
    let data = req.body;
    reservation.create(data).then((results) => {
      res.send(results);
    });
  },
  update: (req, res) => {
    const reservation = new Reservation();
    let data = req.body;
    let id = req.params.id;
    reservation.update(id, data).then((results) => {
      res.send(results);
    });
  },
  delete: (req, res) => {
    const reservation = new Reservation();
    let id = req.params.id;
    reservation.delete(id).then((results) => {
      res.send(results);
    });
  },
};

module.exports = Controller;
