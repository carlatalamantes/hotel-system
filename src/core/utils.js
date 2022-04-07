const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken() {}
function verifyToken() {}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
