"use strict";

const { server } = require("../src/server");
const supertest = require("supertest");

const mockRequest = supertest(server);

test("hello endpoint", async () => {
  const response = await mockRequest.get("/hello");
  // console.log(response.response.text);
  expect(response.res.text).toBe("Hello!");
});

test("goodbye endpoint", async () => {
  const response = await mockRequest.get("/goodbye");
  expect(response.res.text).toBe("goodbye");
});

describe("Person Route", () => {
  test("Expects a query string from the user with a “name” property ", async () => {
    const response = await mockRequest.get("/person?name=chris");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: "chris" });
  });

  
  test("When query string present, output JSON to the client with this shape: { name: 'name provided' }", async () => {
      const response = await mockRequest.get("/person?name=Lopez");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ name: "Lopez" });
    });
    
    test("Without a name in the query string, force a “500” error", async () => {
        const response = await mockRequest.get("/person");
        expect(response.status).toBe(500);
    });

});
