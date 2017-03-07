'use strict';
const authentication = require('./authentication');
const user = require('./user');
const expense = require('./expense');
const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(expense);

  // Setup relationships
  const models = sequelize.models;
  Object.values(models)
    .filter(model => model.associate)
    .forEach(model => model.associate(models));

  sequelize.sync();
};
