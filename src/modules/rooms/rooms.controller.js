const Room = require("./room.model");

//Validation here
const Controller = {
  getAll: (req, res) => {
    const room = new Room();
    room.getAll().then((results) => {
      res.send(results);
    });
  },
  getOne: (req, res) => {
    const room = new Room();
    let id = req.params.id;
    room.getOne(id).then((results) => {
      res.send(results);
    });
  },
  create: (req, res) => {
    const room = new Room();
    let data = req.body;
    room.create(data).then((results) => {
      res.send(results);
    });
  },
  update: (req, res) => {
    const room = new Room();
    let data = req.body;
    let id = req.params.id;
    room.update(id, data).then((results) => {
      res.send(results);
    });
  },
  delete: (req, res) => {
    const room = new Room();
    let id = req.params.id;
    room.delete(id).then((results) => {
      res.send(results);
    });
  },
};

module.exports = Controller;
