'use strict';

const { server } = require("../src/server");
const supertest = require("supertest");
const { request } = require("express");

const mocRequest = supertest(server);

let testName = {
    name : 'Foo'
}

let emptyName = {
}

test('hello endpoint', async () =>{
    const response = await mocRequest.get("/hello");
    console.log(response.res.text);
    expect(response.res.text).toBe("Hello!");
});


test('goodbye endpoint', async ()=>{
    const response = await mocRequest.get('/goodbye');
    expect(response.res.text).toBe('goodbye');
})
// Method: GET
// Path: /person
// Expects a query string from the user with a “name” property
// When present, output JSON to the client with this shape: { name: "name provided" }
// Without a name in the query string, force a “500” error

// describe("Person Route", ()=> {

// it("respond 200 if there is a string", async ()=>{
//     const response = await mocRequest.get("/person").query(testName)
//     expect(response.status).toBe(200);
// })

// it("it should come with 400", async()=> {
//     const response = await mocRequest.post("/person")
//     console.log(response);
//     expect(response.status).toBe(404);
// })

// it("Server error 500", async()=>{
//     const response = await mocRequest.get("./person").query(emptyName)
//     console.log(response);
// })
//   test('When query string present, output JSON to the client with this shape: { name: "name provided" }', async () => {
//     const response = await request.get('/person?name=Gandalf');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({ name: 'Gandalf' });
//   });
// it("404", ()=> {
//     return mocRequest
//         .get('/test')
//         .then(results, ()=>{
//             expect(results.status).tobe()
//         })
// })

// }) 

describe("Person Route", ()=> {

    test( "Expects a query string from the user with a “name” property ", async ()=> {
            const response = await mocRequest.get("")
    })  

    test( "When query string present, output JSON to the client with this shape: { name: 'name provided' }" , async () =>{
             const response  = await mocRequest.get("/person?name=Lopez");
             expect(response.status).toBe(200);
             expect(response.body).toEqual({ name : 'Lopez' });
        });
        
    test( "Without a name in the query string, force a “500” error", async ()=> {
            const response = await mocRequest.get("/person");
            expect(response.status).toBe(500);
        });
        
        // test.todo('Without a name in the query string, force a “500” error');
    });
