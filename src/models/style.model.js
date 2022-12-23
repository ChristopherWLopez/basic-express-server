const { DataTypes } = require('sequelize');

function makeStyle(sequelize){
    return sequelize.define('Style', {
        name: DataTypes.STRING,
    });
}

module.exports = { makeStyle };