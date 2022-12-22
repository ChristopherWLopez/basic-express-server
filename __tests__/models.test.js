const { sequelize, Pedal , Style } = require('../src/models/index');

beforeEach(() => sequelize.sync());
afterEach(()=> sequelize.drop());

test("Create & Read Style" , async ()=>{
    const style = await Style.create({ name: "Phasers" });

    const pedal1 = await Pedal.create({ name: "Phase 90" });
    const pedal2 = await Pedal.create({ name: "Whetstone Phaser" });

    await style.addPedal(pedal1);
    await pedal2.setStyle(style);
    // await style.addUsers([pedal1, pedal2])

    const style_read = await Style.findOne({
        where: {
            name: 'Phasers',
        },
        include: Pedal,
    });

    expect(style_read.Pedals.length).toBe(2);

})