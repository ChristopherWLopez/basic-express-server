'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const { sequelize } = require('../src/models/index');


// an instance of the req via the server through supertest
const req = supertest(server);

beforeAll(async ()=>{await sequelize.sync();});
afterAll(async ()=>{await sequelize.drop();});


// create a function to help to help create a test instance of the user
const userCreated = async ()=>{
    return  await req.post('/signup').send({
        username: 'Maru',
        password: 'Maru5',
    });
};

describe('#Users for testing', ()=> {

    it.skip("testing for user creation", async ()=>{

        const res = await userCreated();
        expect(res.status).toBe(201);
    });

    it("testing signin", async ()=>{
        const res = await req
        .post('/signin');
        .set('Authorization', '' )
    })




});