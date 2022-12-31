'use strict';

require('dotenv').config();

const { sequelize } = require('./src/models');
const { start } = require('./src/server.js');

sequelize.sync().then(()=>start(process.env.PORT || 3000) )
.catch( e => console.log(e.message));

// entry point "power button"