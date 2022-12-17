"use strict";

const express = require("express");
const app = express();
const validator = require("./middleware/validator");
const notFound = require("./error-handlers/404");
const serverError = require("./error-handlers/500");
const logger = require('../src/middleware/logger');
const { recordRoutes } = require("./routes/record.route");
const { pedalRoutes } = require("./routes/pedal.route");

app.use(express.json());


app.use(logger);




app.get("/hello", (_, res) =>  { 
  res.status(200).send("Hello!")
});

app.get("/goodbye", (_, res) => res.send("goodbye"));
// add logger MW
app.get("/", (req, res, next) => {
  res.status(200).send("welcome, doctor");
});


app.use(recordRoutes);

app.use(pedalRoutes);

app.get("/person", validator, (req, res) => {
    // if (req.query.name) {
  res.status(200).send({ name: req.query.name });
    // } else {
    //   res.status(500).send();
    // }
});

app.use("*", notFound);

app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  },
};
