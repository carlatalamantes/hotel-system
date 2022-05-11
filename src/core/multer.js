const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, crypto.randomUUID() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 },
});

module.exports = upload;
