"use strict";

// const server = require("../server");

function handle500(req, res) {
  let object = {
    status: 500,
    message: "500 there are no the droids",
  };
  res.status(500).json(object);
}

// function error500(err, req, res, next) {}

// server.get('/pass_error', (req, res, next) =>{
//     res.status(500).send({ message: 'there was a issue' });
// });

// server.use((err, req, res, next)=>{
//     res.status(500).send({ message: 'there was a big problem' });
// });

module.exports = handle500;
