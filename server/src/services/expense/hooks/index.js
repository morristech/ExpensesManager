'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.queryWithCurrentUser(),
  ],
  find: [],
  get: [
    auth.restrictToOwner(),
  ],
  create: [
    auth.associateCurrentUser(),
  ],
  update: [
    auth.restrictToOwner(),
  ],
  patch: [
    auth.restrictToOwner(),
  ],
  remove: [
    auth.restrictToOwner(),
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
