'use strict';

// user-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const user = sequelize.define('users', {
    facebookId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type:   Sequelize.ENUM,
      values: ['user', 'manager', 'admin'],
      defaultValue: 'user'
    }
  }, {
    freezeTableName: true,
    // Define Relationships
    // https://github.com/feathersjs/feathers-sequelize/issues/20
    classMethods: {
      associate(models) {
        console.log(models)
        user.hasMany(models.expenses);
      }
    }
  });

  return user;
};
