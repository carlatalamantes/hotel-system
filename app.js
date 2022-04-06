const express = require("express");
const path = require("path");
const Database = require("./src/core/database");
const apiRoutes = require("./src/routes");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

/*
 * Middlewares
 */

app.use("/assets", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", apiRoutes);

/*
 * Main get
 */
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "src", "index.html");
  res.sendFile(indexPath);
  // res.send('hola mundo');
});

/*
 * Database connect and app listen
 */
Database.connect().then(() => {
  app.listen(port, () => {
    console.log("App is listening to port " + port);
  });
});
