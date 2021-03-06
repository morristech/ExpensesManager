'use strict';

const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

const validationSchema = require('../validation');
const assignToUser = require('./assignToUser');
const queryAllOrWithCurrentUser = require('./queryAllOrWithCurrentUser');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  ],
  find: [
    queryAllOrWithCurrentUser(), // all expenses if ?all=true && isAdmin, or else only the current user's expenses
  ],
  get: [
    auth.restrictToRoles({
      roles: ['admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
    }),
  ],
  create: [
    assignToUser(), // to currentUser is not admin, or to userId if admin && userId defined
    hooks.validate(validationSchema.expense),
  ],
  update: [
    auth.restrictToRoles({
      roles: ['admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
    }),
    hooks.validate(validationSchema.expense),
  ],
  patch: [
    auth.restrictToRoles({
      roles: ['admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
    }),
    hooks.validate(validationSchema.expense),
  ],
  remove: [
    auth.restrictToRoles({
      roles: ['admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
    }),
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
