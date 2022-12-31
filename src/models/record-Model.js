const { DataTypes } = require("sequelize");

function makeRecord(sequelize) {
  return sequelize.define("Records", {
    bandName: DataTypes.STRING,
    recordName: DataTypes.STRING,
  });
}

module.exports = {
  makeRecord,
};
