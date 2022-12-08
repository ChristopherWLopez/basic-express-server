'use strict';

const express = require('express');
const app = express();
const notFound = require("./error-handlers/404");
const serverError = require("./error-handlers/500");

// app.get('/person', (req, res) => {
//     const person = { 
//         name: "req.query.name"
//      }
//     res.status(200).send(person)
// });

app.get("/person", (req, res)=> res.send(''));

app.use( notFound );

app.use( serverError );


module.exports = {
     server:app,
     start:port => {
        app.listen(port, ()=> console.log(`listening on port ${port}`))
     }
 };