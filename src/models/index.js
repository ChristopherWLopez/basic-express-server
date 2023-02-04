require("dotenv").config();
const { Sequelize } = require("sequelize");
const { makePedalBoard } = require("./pedalboard-Model");
const { makeRecord } = require("./record-Model");
// const { Collection } = require("./collection.model");
const { makeUser } = require("../auth/models/users-model");

const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;
console.log(DATABASE_URL);

const CONNECTION_OPTIONS =
  process.env.NODE_ENV === "test"
    ? { dialect: "sqlite", storage: ":memory:" }
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };

let sequelize;
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
  });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, CONNECTION_OPTIONS);
}

const Record = makeRecord(sequelize);
const Pedal = makePedalBoard(sequelize);

// different approach: use my class and methods. passing in a model

// attemps at association
// Pedal.hasMany(Pedal_Type);
// Pedal_Collection.hasMany(Pedal);
// Pedal.belongsTo(Pedal_Collection);

// auth
const User = makeUser(sequelize);


module.exports = {
  sequelize,
  Record,
  Pedal,
  User,
  
  // Pedal_Collection,

  // came across a way of doing it this way: I am trying to finish this assignment
  // Pedal_Collection: new Collection(Pedal),
  // recordCollection: new Collection(Record),
};
