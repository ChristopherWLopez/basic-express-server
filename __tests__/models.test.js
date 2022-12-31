const { sequelize, Pedal , Pedal_Collection } = require('../src/models/index');
const { server } = require('../src/server');
const supertest = require('supertest');

const request = supertest

beforeEach(()=> sequelize.sync());
afterEach(()=> sequelize.drop());

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
    await request.post('/pedal').send({
        pedalType:'phaser',
        pedalName: 'phase 90',
    });
    await request.post('/pedal').send({
        pedalType: 'modular',
        pedalName:'rainbow machine',
    });
}

// describe('Rest api', ()=>{

//     it('404 request',  ()=> {
//         const res = request.agent('/bar');
//         expect(res.status).toEqual(404);
//     });
// })