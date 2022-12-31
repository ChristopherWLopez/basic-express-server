// const { sequelize, Pedal , Pedal_Collection } = require('../src/models/index');
const { sequelize } = require("../src/models/index");
const { server } = require("../src/server");
const supertest = require("supertest");
const request = supertest(server);

beforeEach(  () =>  sequelize.sync());

// test("Create & Read Style" , async ()=>{
//     const pedalRack = await Pedal_Collection.create({ name: "Phasers" });

//     const pedal1 = await Pedal.create({ pedalType : "phaser ", pedalName: "Phase 90"  });
//     const pedal2 = await Pedal.create({ pedalType : "phaser", pedalName: "Whetstone Phaser" });

//     console.log('*****', pedal1);

//     await pedalRack.addPedal(pedal1);
//     await pedalRack.addPedal(pedal2);
//     // await pedal1.Pedal_Collection(pedalRack)
//     // await pedal2.Pedal_Collection(pedalRack);
//     // await style.addUsers([pedal1, pedal2])

//     const Collection_read = await Pedal_Collection.findOne({
//         where: {
//             name: 'Phasers',
//         },
//         include: Pedal,
//     });

//     expect(Collection_read.Pedals.length).toBe(2);

// })

// populate the list for the sake of tests with create method
const createItems = async () => {
  await request.post("/pedal").send({
    pedalType: "phaser",
    pedalName: "phase 90",
  });
  await request.post("/pedal").send({
    pedalType: "modular",
    pedalName: "rainbow machine",
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

  test("create items", async () => {
    let res = await request.post("/pedal").send({
      pedalType: "phaser",
      pedalName: "phase 90",
    });
    let resTwo = await request.post("/pedal").send({
      pedalType: "modular",
      pedalName: "rainbow machine",
    });
    expect(res.body.pedalType).toEqual("phaser");
    expect(res.body.pedalName).toEqual("phase 90");
    expect(resTwo.body.pedalType).toEqual("modular");
    expect(resTwo.body.pedalName).toEqual("rainbow machine");
  });

  test("find all items", async () => {
    await createItems();
    let res = await request.get("/pedal");

    expect(res.body[0].pedalType).toEqual("phaser");
    expect(res.body[0].pedalName).toEqual("phase 90");
    expect(res.body[1].pedalType).toEqual("modular");
    expect(res.body[1].pedalName).toEqual("rainbow machine");
  });
  
  test("find an item", async ()=>{
      await createItems();
      let res = await request.get('/pedal/1');
      
      expect(res.body.pedalType).toEqual('phaser');
      expect(res.body.pedalName).toEqual('phase 90');
    })
    
    test("update single", async ()=>{
        await createItems()
        let res = await request.put('/pedal/1').send({
            pedalType:'phaser',
            pedalName:'whetstone',
        });
        expect(res.body.pedalType).toEqual('phaser');
        expect(res.body.pedalName).toEqual('whetstone')
    });

    test('delete', async ()=>{
        await createItems()
        await request.delete('/pedal/1');
        let res = await request.get('/pedal');
        expect(res.body[0].pedalType).toEqual('modular');
        expect(res.body[0].pedalName).toEqual('rainbow machine');
    })
});
afterEach(async () =>await  sequelize.drop());
