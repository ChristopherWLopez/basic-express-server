"use strict";

// dont we need to use '*' any route "if we get here and we nothing than trigger the error"
function handle404(req, res, next) {
  let object = {
    status: 404,
    message: "404 these are not the droids you are looking for",
  };
  res.status(404).json(object);
}

module.exports = handle404;
 