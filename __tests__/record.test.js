const { sequelize } = require("../src/models/index");
const { server } = require("../src/server");
const supertest = require("supertest");
const request = supertest(server);

beforeEach(  () =>  sequelize.sync());

const createRecords = async () => {
    await request.post("/record").send({
      bandName: "The Mars Volta",
      recordName: "De-loused",
    });
    await request.post("/record").send({
      bandName: "At the drive-in",
      recordName: "Relationship of command",
    });
  };
  
  // using the describe keyword to hold a series of tests
  describe("Restful api", () => {
    //  checking if 404 is working
    // naming test
    test("404", async () => {
      // getting my response using the get method from the /bar endpoint
      const res = await request.get("/bar");
      // setting expect to what my response status to be (404)
      expect(res.status).toEqual(404);
    });
  
    test("create records", async () => {
      let res = await request.post("/record").send({
        bandName: "The Mars Volta",
        recordName: "De-loused",
      });
      let resTwo = await request.post("/record").send({
        bandName: "At the drive-in",
        recordName: "Relationship of command",
      });
      expect(res.body.bandName).toEqual("The Mars Volta");
      expect(res.body.recordName).toEqual("De-loused");
      expect(resTwo.body.bandName).toEqual("At the drive-in");
      expect(resTwo.body.recordName).toEqual("Relationship of command");
    });
  
    test("find all items", async () => {
      await createRecords();
      let res = await request.get("/record");
  
      expect(res.body[0].bandName).toEqual("The Mars Volta");
      expect(res.body[0].recordName).toEqual("De-loused");
      expect(res.body[1].bandName).toEqual("At the drive-in");
      expect(res.body[1].recordName).toEqual("Relationship of command");
    });
    
    test("find an item", async ()=>{
        await createRecords();
        let res = await request.get('/record/1');
        
        expect(res.body.bandName).toEqual('The Mars Volta');
        expect(res.body.recordName).toEqual('De-loused');
      })
      
      test("update single", async ()=>{
          await createRecords()
          let res = await request.put('/record/1').send({
              bandName:'Madlib',
              recordName:'Selftitled',
          });
          expect(res.body.bandName).toEqual('Madlib');
          expect(res.body.recordName).toEqual('Selftitled')
      });
  
      test('delete', async ()=>{
          await createRecords()
          await request.delete('/record/1');
          let res = await request.get('/record');
          expect(res.body[0].bandName).toEqual('At the drive-in');
          expect(res.body[0].recordName).toEqual('Relationship of command');
      })
  });
  afterEach(async () =>await  sequelize.drop());
  