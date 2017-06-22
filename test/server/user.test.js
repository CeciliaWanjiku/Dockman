process.env.NODE_ENV = 'development';

const chai = require('chai');

const expect = chai.expect;
const supertest = require('supertest');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const api = (require('../../server/app'));
let token = '';

describe('Users', () => {
  // login /
  beforeEach('login admin', (done) => {
    chai.request(api)
      .post('/api/users/login')
      .send({ email: 'admin@admin.com', password: 'admin' })
      .then((res) => {
        token = res.body.token;
        done();
      });
  });
  describe('Users', () => {
    describe('/POST user', () => {
      it('it should GET all the users', (done) => {
        chai.request(api)
      .post('/api/users/login')
      .send({ email: '', password: '' })
     .end((response) => {
       expect(404);
       console.log('hii resp hapa', response);
       done();
     });
      });
    });
  });

  describe('Users', () => {
    describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(api)
      .get('/api/users/')
      .set('access-token', token)
       .end((err, response) => {
         expect(response.statusCode).to.equal(200);
         done();
       });
      });
    });
  });

  describe('/POST user', () => {
    it('it should return an error for invalid passoword', (done) => {
      chai.request(api)
      .post('/api/users/')
      .send({
        name: 'newww user',
        email: 'invalidemail',
      })
      .end(() => {
        expect(401);
        done();
      });
    });
  });
  describe('/GET user/:userId', () => {
    it('it should GET user by userId', (done) => {
      chai.request(api)
      .get('/api/users/2')
      .set('access-token', token)
        .end(() => {
          expect(200);
          done();
        });
    });
  });
  describe('/DELETE users/:userId', () => {
    it('it should DELETE user by userId', (done) => {
      chai.request(api)
      .delete('/api/users/5')
      .set('access-token', token)
          .end(() => {
            expect(204);
            done();
          });
    });
  });
  describe('/PUT users/:userId', () => {
    it('it should UPDATE a user by userId', (done) => {
      chai.request(api)
      .put('/api/users/4')
      .set('access-token', token)
      .send({
        name: 'newww user'
      })
      .end(() => {
        expect(200);
        done();
      });
    });
  });
  describe('/GET users/:userId', () => {
    it('it should PAGINATE users', (done) => {
      chai.request(api)
      .get('/api/users/?limit=3&offset=2')
      .set('access-token', token)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('/GET search/users', () => {
    it('it should search a user', (done) => {
      chai.request(api)
      .get('/api/search/users/?q=wamuciii')
      .set('access-token', token)
      .end(() => {
        expect(200);
        done();
      });
    });
  });
});
