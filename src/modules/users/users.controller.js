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
    const {
      name,
      first_lastname,
      second_lastname,
      cellphone,
      email,
      password,
    } = req.body;

    const user = new User();
    user
      .create({
        name,
        first_lastname,
        second_lastname,
        cellphone,
        email,
        password,
      })
      .then((results) => {
        res.status(results.code).json(results.message);
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
    const { email, password } = req.body;
    const user = new User();
    user.login({ email, password }).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
};

module.exports = Controller;
