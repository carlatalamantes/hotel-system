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
    const { name, first_lastname, second_lastname, cellphone, email } =
      req.body;
    let newData = { name, first_lastname, second_lastname, cellphone, email };
    let id = req.params.id;
    const user = new User();
    user.update(id, newData).then((results) => {
      res.status(results.code).json(results.message);
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    const user = new User();
    user.delete(id).then((results) => {
      res.status(results.code).json(results.message);
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
