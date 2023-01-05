const express = require('express');
const base64 = require('base-64');
const {User} = require('../models');

const authRoutes = express();

authRoutes.use(express.json())
//post request to the signup route



async function signup(req,res,next){
    
    const { username, password } = req.body;
    await User.createWithHashed(username, password);
    res.send(201);
}

async function signin(req,res,next){
    let authorization = req.header('Authorization');
    if(!authorization.startsWith('Basic')){
        next(new Error('Invalid authorization scheme'));
        return;
    }
    // what is this doing?
    authorization = base64.decode(authorization.replace('Basic ', ''));
    
    console.log("Basic authorization request", authorization);
    
    const [username, password] = authorization.split(':');
    let user = await User.findLoggedIn(username, password);
    if(user){
        res.status(200).send({ username: user.username}); 
    }else{
        next(new Error('Invalid login'));
    }
}


authRoutes.post('/signup',signup);

authRoutes.post('/signin', signin);


module.exports = { authRoutes };