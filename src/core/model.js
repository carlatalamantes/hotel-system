const Database = require("./database");
const { ObjectId } = require("mongodb");

class Model {
  collection;

  constructor(collectionName) {
    this.collection = Database.collection(collectionName);
  }

  getAll() {
    return new Promise((accept, reject) => {
      this.collection.find().toArray((err, results) => {
        if (err) {
          reject(err);
        } else {
          accept(results);
        }
      });
    });
  }

  getOne(id) {
    return this.collection.findOne({
      _id: ObjectId(id),
    });
  }
}

module.exports = Model;
