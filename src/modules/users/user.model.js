const Model = require("../../core/model");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../../core/utils");
const { ObjectId } = require("mongodb");

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
        err.message = { message: "Email is already registered" };
        throw err;
      }

      data.password = await hashPassword(data.password);

      await this.collection.insertOne({
        ...data,
        role: "user",
        reservations: [],
      });

      return { message: { message: "User was created" }, code: 201 };
    } catch (error) {
      return error;
    }
  }

  async update(id, data) {
    try {
      const userExists = await this.collection.findOne({ _id: ObjectId(id) });
      if (!userExists) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "User is not registered" };
        throw err;
      }

      await this.collection.updateOne({ _id: ObjectId(id) }, { $set: data });

      return { message: { message: "User was updated" }, code: 200 };
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      const userExists = await this.collection.findOne({ _id: ObjectId(id) });
      if (!userExists) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "User is not registered" };
        throw err;
      }

      await this.collection.remove({ _id: ObjectId(id) });

      return { message: { message: "User was deleted" }, code: 200 };
    } catch (error) {
      return error;
    }
  }

  async login(data) {
    try {
      var err = new Error("Error");
      const userExists = await this.collection.findOne({ email: data.email });
      if (userExists) {
        let passwordResult = await comparePassword(
          data.password,
          userExists.password
        );
        if (!passwordResult) {
          err.code = 403;
          err.message = {
            message: "Email and password combination does not match",
          };
          throw err;
        }
        const token = generateToken(userExists._id, userExists.role);

        return { message: { token }, code: 200 };
      } else {
        err.code = 404;
        err.message = { message: "Email is not registered" };
        throw err;
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = User;
