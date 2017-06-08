process.env.NODE_ENV = 'test';

const chai = require('chai');

const expect = chai.expect;
const supertest = require('supertest');

const api = supertest('http://localhost:8090');

describe('Users', () => {
  describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      api.get('/api/users/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.equal(true);
      });
      done();
    });
  });
  describe('/POST user', () => {
    it('it should create a users', (done) => {
      api.post('/api/users/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.equal(true);
      });
      done();
    });
  });
  describe('/GET user/:userId', () => {
    it('it should GET user by userId', (done) => {
      api.get('/api/users/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/DELETE users/:userId', () => {
    it('it should DELETE user by userId', (done) => {
      api.delete('/api/users/:userId', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/PUT users/:userId', () => {
    it('it should UPDATE a user by userId', (done) => {
      api.put('/api/users/:userId', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/GET users/:userId', () => {
    it('it should PAGINATE users', (done) => {
      api.get('/api/users/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/GET search/users', () => {
    it('it should search a user', (done) => {
      api.get('//api/search/users/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
});
