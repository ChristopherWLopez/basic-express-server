const server = require('express');

const logger = function logger(req, _, next) {            // log out the request path
    console.log(req.path);
    next();
};

module.exports = logger; 