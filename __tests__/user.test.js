'use strict';

const supertest = require('supertest');
const { server } = require('../src/server.js');
const { sequelize } = require('../src/models/index.js');
// an instance of the req via the server through supertest
const req = supertest(server);




beforeAll(async ()=>{await sequelize.sync();});

afterAll(async ()=>{await sequelize.drop();});

// create a function to help to help create a test instance of the user
const userCreated = async ()=>{
    // create a mock request to the signup endpoint where I am sending the username and password within the same structure as my model
    return  await req.post('/signup').send({
        username: 'Maru',
        password: 'Maru5',
    });
};


describe('Users for testing', ()=> {

    // name of test 
    it("testing for user creation", async ()=>{
// getting an instance of my userCreated method
        const res = await userCreated();
        // what i am expecting from that (a 201)
        expect(res.status).toBe(201);
    });

// i dont completely understand what this part of the test is doing so i will ask before moving forward with finishing this
    it.skip("testing signin", async ()=>{
        // and instance of my request from the signin route
        const res = await req
        .post('/signin')
        .set('Authorization', '' )
    })




});