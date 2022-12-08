'use strict';

function handle500(req, res){
    let object = {
        status: 500,
        message: "500 there are no the droids"
    }
    res.status(500).json(object);
}

module.exports = handle500;