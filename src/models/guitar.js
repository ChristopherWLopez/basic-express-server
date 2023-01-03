const { DataTypes } = require('sequelize');

function makeGuitar(sequelize){
    return sequelize.define('Guitar', {
        brand: DataTypes.STRING,
        style: DataTypes.STRING,

    });
}

module.exports = makeGuitar