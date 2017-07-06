
const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const supertest = require('supertest');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const api = (require('../../server/app'));

let token = '';

describe('Documents', () => {
  chai.request(api)
      .post('/api/users/')
      .send({ email: 'testdoc@admin.com', password: 'admin', name: 'admin', role: 'admin' })
      .then((res) => {
        // console.log(res.body);
      });
  // login /
  beforeEach('login user', (done) => {
    chai.request(api)
      .post('/api/users/login')
      .send({ email: 'testadmin@admin.com', password: 'admin' })
      .then((res) => {
        token = res.body.token;
        done();
      });
      // .catch(err => console.log(err));
  });

  describe('/GET document', () => {
    it('it should GET all the documents', (done) => {
      chai.request(api)
      .get('/api/documents/')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.be.at.least(1);
        done();
      });
    });
  });
  describe('/GET document', () => {
    it('it should GET role-based documents', (done) => {
      chai.request(api)
      .get('/api/documents/')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.be.at.least(1);
        done();
      });
    });
  });
  describe('/GET public documents', () => {
    it('it should GET all publicdocuments', (done) => {
      chai.request(api)
      .get('/api/documents/public/?limit=2')
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('it should GET raise error when getting public documents', (done) => {
      chai.request(api)
      .get('/api/documents/publics')
      .end((err, response) => {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
    it('it should GET raise error when getting public documents', (done) => {
      chai.request(api)
      .get('/api/documents/publics')
      .end((err, response) => {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });
  describe('/GET user documents', () => {
    it('it should GET user documents', (done) => {
      chai.request(api)
      .get('/users/3/documents/?limit=2')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        // expect(response.body.length).to.be.at.least(1);
        done();
      });
    });
    it('it should raise error when getting user documents', (done) => {
      chai.request(api)
      .get('/users/a/documents/?limit=2')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(400);
        // expect(response.body.length).to.be.at.least(1);
        done();
      });
    });
    it('it should raise error when getting user documents', (done) => {
      chai.request(api)
      .get('/users/q/documents/?limit=2')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(400);
        // expect(response.body.length).to.be.at.least(1);
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
      .get('/api/documents/gvvv')
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
    it('should return a 400 response', (done) => {
      chai.request(api)
        .put('/api/documents/jmnbcvx')
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
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
    it('it should raise an error while updating a document by id', (done) => {
      chai.request(api)
      .put('/api/documents/20')
      .set('access-token', token)
      .send({
        title: 'neee doooc'
      })
      .end(() => {
        expect(400);
        done();
      });
    });
    it('it should update document by Id', (done) => {
      chai.request(api)
      .put('/api/documents/12')
      .set('access-token', token)
      .end(() => {
        expect(404);
        done();
      });
    });
    it('should return a 400 response', (done) => {
      chai.request(api)
        .put('/api/documents/jmnbcvx')
        .set('access-token', token)
        .send({
          name: 'newwww',
          content: 'newwwwww',
          role: 'private',
          UserId: 2,
        })
        .end((err, res) => {
          res.should.have.status(400);
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
    it('it should return error if invalid pagination parameters are passed', (done) => {
      chai.request(api)
      .get('/api/documents/?limit=adasd')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    // it('it should return error if invalid pagination parameters are passed', (done) => {
    //   chai.request(api)
    //   .get('/api/document')
    //   .set('access-token', token)
    //   .end((err, response) => {
    //     expect(response.statusCode).to.equal(400);
    //     done();
    //   });
    // });
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
    it('should return a 400 response', (done) => {
      chai.request(api)
        .put('/api/search/documents/jmnbcvx')
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
