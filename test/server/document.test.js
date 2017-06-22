process.env.NODE_ENV = 'development';

const chai = require('chai');

const expect = chai.expect;
const supertest = require('supertest');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const api = (require('../../server/app'));
let token = '';

describe('Documents', () => {
  // login /
  beforeEach('login user', (done) => {
    chai.request(api)
      .post('/api/users/login')
      .send({ email: 'muchai@muchai.com', password: 'muchai' })
      .then((res) => {
        token = res.body.token;
        done();
      });
  });

  describe('/GET document', () => {
    it('it should GET all the documents', (done) => {
      chai.request(api)
      .get('/api/documents/')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        //expect(response.statusText).to.equal('OK');
        expect(response.body.length).to.equal(4);
        done();
      });
    });
  });
  describe('/POST document', () => {
    it('it should create a document', (done) => {
      api.post('/api/documents/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.equal(true);
      });
      done();
    });
  });
  describe('/GET document/:Id', () => {
    it('it should GET user by Id', (done) => {
      api.get('/api/documents/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/DELETE document/:userId', () => {
    it('it should DELETE a document by Id', (done) => {
      api.delete('/api/document/:id', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/PUT documents/:id', () => {
    it('it should UPDATE a document by id', (done) => {
      api.put('/api/users/:id', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/GET documents/:id', () => {
    it('it should PAGINATE documents', (done) => {
      api.get('/api/documents/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
  describe('/GET search/documents', () => {
    it('it should search a document', (done) => {
      api.get('//api/search/document/', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response.statusMessage).to.equal('OK');
        expect(body).to.be.a('object');
        expect(response.body.name).to.not.equal(null);
      });
      done();
    });
  });
});
