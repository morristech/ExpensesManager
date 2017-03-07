'use strict';

// expense-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const expense = sequelize.define('expenses', {
    amount: {
      type: Sequelize.STRING,
      allowNull: false
    },
    datetime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });

  return expense;
};
