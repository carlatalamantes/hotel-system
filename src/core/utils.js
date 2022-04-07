const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken(id) {
  return jwt.sign(
    {
      id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
}
function verifyToken() {}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
