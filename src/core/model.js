const Database = require("./database");
const { ObjectId } = require("mongodb");

class Model {
  collection;
  secondColletion;

  constructor(collectionName) {
    this.collection = Database.collection(collectionName);
    this.secondColletion = Database.collection("reservacion");
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
