const Model = require("../../core/model");
const { ObjectId } = require("mongodb");

class Room extends Model {
  constructor() {
    super("habitacion");
  }

  async create(data) {
    try {
      const roomExists = await this.collection.findOne({ name: data.name });
      if (roomExists) {
        var err = new Error("Error");
        err.code = 422;
        err.message = { message: "Room is already registered" };
        throw err;
      }

      await this.collection.insertOne({
        ...data,
      });

      return { message: { message: "Room was created" }, code: 201 };
    } catch (error) {
      return error;
    }
  }

  async update(id, data) {
    try {
      const roomExists = await this.collection.findOne({ _id: ObjectId(id) });
      if (!roomExists) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "Room is not registered" };
        throw err;
      }

      await this.collection.updateOne({ _id: ObjectId(id) }, { $set: data });

      return { message: { message: "Room was updated" }, code: 200 };
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      const roomExists = await this.collection.findOne({ _id: ObjectId(id) });
      if (!roomExists) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "Room is not registered" };
        throw err;
      }

      await this.collection.remove({ _id: ObjectId(id) });

      return { message: { message: "Room was deleted" }, code: 200 };
    } catch (error) {
      return error;
    }
  }
  async uploadPhoto(id, file) {
    try {
      const roomExists = await this.collection.findOne({ _id: ObjectId(id) });
      if (!roomExists || file == undefined) {
        var err = new Error("Error");
        err.code = 404;
        err.message = { message: "Room is not registered or file is empty" };
        throw err;
      }

      await this.collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { image: file.filename } }
      );

      return { message: { message: `Image was added` }, code: 200 };
    } catch (error) {
      return error;
    }
  }
}

module.exports = Room;
