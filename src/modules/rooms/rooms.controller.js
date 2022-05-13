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
    const {
      name,
      building,
      exterior_number,
      bed_count,
      guest_count,
      nightly_price,
      services,
    } = req.body;
    const room = new Room();
    room
      .create({
        name,
        building,
        exterior_number,
        bed_count,
        guest_count,
        nightly_price,
        services,
      })
      .then((results) => {
        res.status(results.code).json(results.message);
      });
  },
  update: (req, res) => {
    const {
      name,
      building,
      exterior_number,
      bed_count,
      guest_count,
      nightly_price,
      services,
    } = req.body;
    let newData = {
      name,
      building,
      exterior_number,
      bed_count,
      guest_count,
      nightly_price,
      services,
    };
    let id = req.params.id;
    const room = new Room();
    room.update(id, newData).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    const room = new Room();
    room.delete(id).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
  uploadPhoto: async (req, res) => {
    let id = req.params.id;
    let file = req.file;
    const room = new Room();
    room.uploadPhoto(id, file).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
};

module.exports = Controller;
