'use strict';

const app = require('../server');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;

describe('#GET /api/search', function () {
  it('should get all search result', function (done) {
    this.timeout(10000);
    request(app)
      .get('/api/search')
      .set('searchKey', 'patrol')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get all detail page with id 2', function (done) {
    this.timeout(10000);
    request(app)
      .get('/newfeed/2')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal(2);
        done();
      });
  });

  it('should return 404', function (done) {
    this.timeout(10000);
    request(app)
      .get('/report')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Unable to find page');
        done();
      });
  });
});
