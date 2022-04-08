const express = require("express");
const path = require("path");
const Database = require("./src/core/database");
const apiRoutes = require("./src/routes");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Hotel System API",
      description: "A booking system for the Motomami hotel",
      version: "1.0.0",
      servers: ["http://localhost:" + port],
    },
  },
  apis: ["./src/modules/**/*.routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

/*
 * Middlewares
 */

app.use("/assets", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
