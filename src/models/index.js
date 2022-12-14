
const { Sequelize } = require('sequelize');
const { makeRecord,makePedalBoard } = require('./record-Model');


const DATABASE_URL = 
        process.env.NODE_ENV === "test" 
        ? 'sqlite::memory:'
        :process.env.DATABASE_URL;
         
const CONNECTION_OPTIONS = 
process.env.NODE_ENV === 'test'
?{}
:{
        ssl: {
                require: true,
                rejectUnauthorized: false,

        },
};
         

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS);

const Record = makeRecord(sequelize);
const Pedal = makePedalBoard(sequelize);

module.exports = {
        sequelize,
        Record,
        Pedal
};