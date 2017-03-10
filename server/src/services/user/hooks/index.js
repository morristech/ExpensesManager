'use strict';

const hooks = require('feathers-hooks-common');
const auth = require('feathers-authentication').hooks;

const validationSchema = require('../validation');

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['manager', 'admin'], // admins are allowed to access this resource
    }),
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['manager', 'admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
      ownerField: 'id'
    }),
  ],
  create: [
    hooks.validate(validationSchema.user),
    auth.hashPassword()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['manager', 'admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
      ownerField: 'id'
    }),
    hooks.validate(validationSchema.user),
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['manager', 'admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
      ownerField: 'id'
    }),
    hooks.validate(validationSchema.user),
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['manager', 'admin'], // admins are allowed to access this resource
      owner: true, // it should also allow owners regardless of their role
      ownerField: 'id'
    }),
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
