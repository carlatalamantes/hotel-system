const User = require("./user.model");

//Validation here
const Controller = {
  getAll: (req, res) => {
    const user = new User();
    user.getAll().then((results) => {
      res.send(results);
    });
  },
  getOne: (req, res) => {
    const user = new User();
    let id = req.params.id;
    user.getOne(id).then((results) => {
      res.send(results);
    });
  },
  create: (req, res) => {
    const user = new User();
    let data = req.body;
    user.create(data).then((results) => {
      res.send(results);
    });
  },
  update: (req, res) => {
    const user = new User();
    let data = req.body;
    let id = req.params.id;
    user.update(id, data).then((results) => {
      res.send(results);
    });
  },
  delete: (req, res) => {
    const user = new User();
    let id = req.params.id;
    user.delete(id).then((results) => {
      res.send(results);
    });
  },
  login: (req, res) => {
    const user = new User();
    let data = req.body;
    user.login(data).then((results) => {
      res.send(results);
    });
  },
};

module.exports = Controller;
