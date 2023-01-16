const express = require("express");
const base64 = require("base-64");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const authRoutes = express();

const SECRET_TOKEN = process.env.SECRET_TOKEN ?? "SET A TOKEN"

authRoutes.use(express.json());
//post request to the signup route

async function signup(req, res, next) {
  const { username, password } = req.body;
  await User.createWithHashed(username, password);
  res.send(201);
}

async function signin(req, res, next) {
  let authorization = req.header("Authorization");
  if (!authorization.startsWith("Basic")) {
    next(new Error("Invalid authorization scheme"));
    return;
  }
  // what is this doing?
  authorization = base64.decode(authorization.replace("Basic ", ""));

  console.log("Basic authorization request", authorization);

  const [username, password] = authorization.split(":");
  try {
    let user = await User.findLoggedIn(username, password);
    if (user) {
      // res.status(200).send({ username: user.username});
      const data = { username: user.username };
      const token = jwt.sign(data, "shhh");
      res.send(token);
      // instead of sending user name, send jwt.
      // res.status(200).send(jsonwebToken);
    } else {
      next(new Error("Invalid login"));
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function checkToken(req, _, next){
    const authorization = req.header('Authorization')??''
    if(!authorization.startsWith("Bearer ")) {
        next(newError("Missing required Bearer header"))
        return
    }
    try{
        const token =  authorization.replace("Bearer ", "")
        const decode = jwt.verify(token, SECRET_TOKEN )
        req.username = decode.username
        next()
    } catch (e) {
        next(new Error('Failed to properly decode auth', { cause: e}))
    }
} 


authRoutes.post("/signup", signup);

authRoutes.post("/signin", signin);

module.exports = { authRoutes , signup, signin, checkToken};
