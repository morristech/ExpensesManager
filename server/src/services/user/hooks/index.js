'use strict';

const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

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
