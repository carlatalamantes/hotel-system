const express = require("express");
const path = require("path");
const Database = require("./src/core/database");
const apiRoutes = require("./src/routes");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { routeLoginToken } = require("./src/core/utils");

require("./src/core/googleAuth");
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
let gfs;

/*
 * Middlewares
 */

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*
 * Main get
 */
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "src", "index.html");
  res.sendFile(indexPath);
  // res.send('hola mundo');
});

/**
 * GOOGLE AUTH
 */
app.get(
  "/google/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:4200/login",
  }),
  (req, res) => routeLoginToken(req, res)
);

/*
 * Database connect and app listen
 */
Database.connect().then(() => {
  app.listen(port, () => {
    console.log("App is listening to port " + port);
  });
});
