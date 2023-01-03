const { sequelize } = require('../../models');
const { makeUser } = require('./users-model');

const User = makeUser(sequelize);

module.exports = { User };