const Model = require("../../core/model");

class User extends Model {
  constructor() {
    super("usuario");
  }

  create(data) {}

  update(id, data) {}

  delete(id) {}

  login(data) {}
}

module.exports = User;
