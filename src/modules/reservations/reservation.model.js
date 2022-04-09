const Model = require("../../core/model");
const { ObjectId } = require("mongodb");

class Reservation extends Model {
  constructor() {
    super("reservacion");
  }

  async create(data) {
    try {
      await this.collection.insertOne(data);
      return { message: { message: "Reservation was created" }, code: 201 };
    } catch (error) {
      return { message: { message: "Reservation was not created" }, code: 500 };
    }
  }

  async update(id, data) {
    try {
      const reservationExists = await this.collection.findOne({
        _id: ObjectId(id),
      });
      if (!reservationExists) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "Reservation is not registered" };
        throw err;
      }

      await this.collection.updateOne({ _id: ObjectId(id) }, { $set: data });

      return { message: { message: "Reservation was updated" }, code: 200 };
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      const reservationExists = await this.collection.findOne({
        _id: ObjectId(id),
      });
      if (!reservationExists) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "Reservation is not registered" };
        throw err;
      }

      await this.collection.remove({ _id: ObjectId(id) });

      return { message: { message: "Reservation was deleted" }, code: 200 };
    } catch (error) {
      return error;
    }
  }
}

module.exports = Reservation;
