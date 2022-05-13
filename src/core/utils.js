require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function generateToken(id, role) {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;
    const role = decodedToken.role;

    if (req.params.id && req.params.id !== userId) {
      if (role === "admin") {
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      next();
    }
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function verifyAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const role = decodedToken.role;

    if (role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function getUserID(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.id;
  return userId;
}

function routeLoginToken(req, res) {
  const token = req.user.token;
  if (token !== "") {
    return res.redirect(
      "https://hotelsystemteamdinamita.herokuapp.com/login-success" +
        "?token=" +
        token
    );
  } else {
    return res.redirect("https://hotelsystemteamdinamita.herokuapp.com/login");
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  verifyAdmin,
  getUserID,
  routeLoginToken,
};
