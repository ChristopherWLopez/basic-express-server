const { DataTypes } = require('sequelize');

function pedaltrain(sequelize){
    return sequelize.define('Pedal', {
        pedalType: DataTypes.STRING,
        pedalName: DataTypes.STRING,

    });
}

module.exports = pedaltrain