const Model = require("../../core/model");

class User extends Model {
  constructor() {
    super("usuario");
  }

  async create(data) {
    try {
      const userExists = await this.collection.findOne({ email: data.email });
      if (userExists) {
        var err = new Error("Error");
        err.code = 422;
        err.msg = { message: "Email is already registered" };
        throw err;
      }
      await this.collection.insertOne({
        ...data,
        role: "user",
        reservations: [],
      });

      return { message: "User was created", code: 201 };
    } catch (error) {
      return error;
    }
  }

  update(id, data) {}

  delete(id) {}

  login(data) {}
}

module.exports = User;
