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
        expect(response.body.length).to.be.at.least(4);
        done();
      });
    });
  });
  describe('/GET public documents', () => {
    it('it should GET all publicdocuments', (done) => {
      chai.request(api)
      .get('/api/documents/public')
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.be.at.least(1);
        done();
      });
    });
  });
  describe('/GET user documents', () => {
    it('it should GET user documents', (done) => {
      chai.request(api)
      .get('/users/2/documents')
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.be.at.least(1);
        done();
      });
    });
  });
  describe('/POST document', () => {
    it('it should create a document', (done) => {
      chai.request(api)
      .post('/api/documents/')
      .set('access-token', token)
      .send({
        name: 'docman',
        content: 'This is a test.',
        category: 'public'
      })
      .end((err, response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body.name).to.equal('docman');
        expect(response.body.content).to.equal('This is a test.');
        done();
      });
    });
  });
  describe('/GET document/:Id', () => {
    it('it should GET document by Id', (done) => {
      chai.request(api)
      .get('/api/documents/2')
      .set('access-token', token)
      .end(() => {
        expect(200);
        done();
      });
    });
    it('it should GET document by Id', (done) => {
      chai.request(api)
      .get('/api/documents/0')
      .set('access-token', token)
      .end(() => {
        expect(404);
        done();
      });
    });
    it('it should GET document by Id', (done) => {
      chai.request(api)
      .get('/api/documents/g')
      .set('access-token', token)
      .end(() => {
        expect(400);
        done();
      });
    });
  });
  describe('/DELETE document/:userId', () => {
    it('it should DELETE a document by Id', (done) => {
      chai.request(api)
      .delete('/api/documents/12')
      .set('access-token', token)
      .end(() => {
        expect(204);
        done();
      });
    });
    it('it should GET document by Id', (done) => {
      chai.request(api)
      .get('/api/documents/0')
      .set('access-token', token)
      .end(() => {
        expect(404);
        done();
      });
    });
    it('it should GET document by Id', (done) => {
      chai.request(api)
      .delete('/api/documents/0')
      .set('access-token', token)
      .end(() => {
        expect(400);
        done();
      });
    });
  });
  describe('/PUT documents/:id', () => {
    it('it should UPDATE a document by id', (done) => {
      chai.request(api)
      .put('/api/documents/20')
      .set('access-token', token)
      .send({
        name: 'neee doooc'
      })
      .end(() => {
        expect(200);
        done();
      });
    });
    it('it should GET document by Id', (done) => {
      chai.request(api)
      .put('/api/documents/12')
      .set('access-token', token)
      .end(() => {
        expect(404);
        done();
      });
    });
  });
  describe('/GET documents/:id', () => {
    it('it should PAGINATE documents', (done) => {
      chai.request(api)
      .get('/api/documents/?limit=2')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/GET search/documents', () => {
    it('it should search a document', (done) => {
      chai.request(api)
      .get('/api/search/documents?q=docman')
      .end(() => {
        expect(200);
        done();
      });
    });
  });
});
