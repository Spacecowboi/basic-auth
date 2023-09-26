'use strict';

// 3rd Party Resources
const express = require('express');
const authorizationRoutes = require('./auth/middleware/routes');
const notFoundHandler = require('./errorhandling/404');
const errorHandler = require('./errorhandling/500');
const {Sequelize} = require('sequelize');


// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());
app.use(authorizationRoutes);
app.use('*', notFoundHandler);
app.use(errorHandler)

// // Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

//start the server for index.js
module.exports.start = function(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
