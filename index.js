'use strict'; 

const {Sequelize} = require('sequelize');
const server = require('./src/server');

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.sync()
  .then(() => {
    server.start(process.env.port || 3001);
  })
  .catch(e => {
    console.error('Could not start server', e.message);
  });