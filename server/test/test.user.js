process.env.NODE_ENV = 'test';

const chai = require('chai');

const expect = chai.expect;
const request = require('request');

describe('Users', () => {
  describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      request('http://localhost:8090/api/users', (error, response, body) => {
        if (error) console.log('ERROR', error);
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(Array.isArray(JSON.parse(body))).to.equal(true);
        done();
      });
    });
  });
});
