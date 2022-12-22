require("dotenv").config();
const { Sequelize } = require("sequelize");
const { makePedalBoard } = require("./pedalboard-Model");
const { makeRecord } = require("./record-Model");
const { makeStyle } = require("./style.model");
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


const Style = makeStyle(sequelize);

Style.hasMany(Pedal);
Pedal.belongsTo(Style);

// auth

const User = makeUser(sequelize);


module.exports = {
  sequelize,
  Record,
  Pedal,
  Style,
};
