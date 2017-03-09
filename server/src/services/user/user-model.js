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
    roles: {
      type:   Sequelize.ARRAY(Sequelize.STRING),
      validate: {
        correctRole: function(value) {
          const Enum = ['user', 'manager', 'admin'];
          for (var i = value.length - 1; i >= 0; i--) {
            if (Enum.indexOf(value[i]) === -1) {
              throw new Error('Invalid role.');
            }
          }
        },
      },
      defaultValue: ['user'],
    }
  }, {
    freezeTableName: true,
    // Define Relationships
    // https://github.com/feathersjs/feathers-sequelize/issues/20
    classMethods: {
      associate(models) {
        user.hasMany(models.expenses, { onDelete: 'cascade' });
      }
    }
  });

  return user;
};
