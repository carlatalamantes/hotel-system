const Model = require("../../core/model");
const { hashPassword } = require("../../core/utils");

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

      data.password = await hashPassword(data.password);

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

  async login(data) {
    try {
      const userExists = await this.collection.findOne({ email: data.email });
      if (userExists) {
        return { message: "kk", code: 200 };
      } else {
        var err = new Error("Error");
        err.code = 422;
        err.msg = { message: "Email is already registered" };
        throw err;
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = User;
