'use strict';

const assert = require('assert');
const request = require('request');
const app = require('../../../src/app');

let token;
let user;
describe('user service for a User', function() {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => {
      request({
        url: 'http://localhost:3030/auth/local',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'test@test.com', password: 'test'})
      }, function(err, res, body) {
        const bodyParsed = JSON.parse(body);
        token = bodyParsed.token;
        user = bodyParsed.data;
        done();
      });
    });
  });

  after(function(done) {
    this.server.close(done);
  });

  it('registered the users service', () => {
    assert.ok(app.service('users'));
  });

  it('logins correctly for User', done => {
    assert.ok(!!token);
    done();
  });

  let newExpenseId;
  it('can create an expense for User', done => {
    request({
      url: 'http://localhost:3030/expenses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ datetime: new Date(), description: 'Something', comment: 'From test.', amount: 10 })
    }, function(err, res, body) {
      const bodyParsed = JSON.parse(body);
      newExpenseId = bodyParsed.id;
      assert.ok(bodyParsed.userId === user.id);
      done();
    });
  });

  it('can fetch user\'s expenses', done => {
    request({
      url: 'http://localhost:3030/expenses',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }, function(err, res, body) {
      const bodyParsed = JSON.parse(body);
      assert.ok(bodyParsed.data.every(item => item.userId === user.id));
      done();
    });
  });

  it('can modify his own expense', done => {
    request({
      url: 'http://localhost:3030/expenses/' + newExpenseId,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ amount: 15 })
    }, function(err, res, body) {
      const bodyParsed = JSON.parse(body);
      assert.ok(bodyParsed.amount === '15');
      done();
    });
  });

  it('can delete his own expense', done => {
    request({
      url: 'http://localhost:3030/expenses/' + newExpenseId,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }, function(err, res, body) {
      const bodyParsed = JSON.parse(body);
      assert.ok(bodyParsed.amount === '15');
      done();
    });
  });

  it('cannot modify another user', done => {
    request({
      url: 'http://localhost:3030/users/6', // 6 is amaury.martiny@gmail.com
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ email: 'amaury.martiny2@gmail.com' })
    }, function(err, res, body) {
      const bodyParsed = JSON.parse(body);
      assert.ok(bodyParsed.code === 403); // Forbidden
      done();
    });
  });
});
