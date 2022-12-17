
const { Sequelize } = require('sequelize');
const { makePedalBoard } = require('./pedalboard-Model');
const { makeRecord } = require('./record-Model');
require('dotenv').config();


const DATABASE_URL = 
        process.env.NODE_ENV === "test" ? 'sqlite::memory:': process.env.DATABASE_URL;
         console.log(DATABASE_URL);
// const DATABASE_URL = 'sqlite:memory:';
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