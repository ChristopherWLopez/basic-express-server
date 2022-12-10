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


// add logger MW
app.get('/', (req, res, next) =>{
    res.status(200).send("welcome, doctor");
});


// app.get("/person", validator,  (req, res)=> {
//     res.status(200).send({ name: req.name });
// });

app.get('/person', (req,res)=>{
    if(req.query.name){
        res.status(200).send({ name: req.query.name });
    }else{
        res.status(500).send();
    }
});

app.use( notFound );

app.use( serverError );


module.exports = {
     server:app,
     start:port => {
        app.listen(port, ()=> console.log(`listening on port ${port}`))
     }
 };
