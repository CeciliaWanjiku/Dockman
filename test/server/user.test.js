

const chai = require('chai');

const expect = chai.expect;
const supertest = require('supertest');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const api = (require('../../server/app'));

let token = '';

describe('Users', () => {
  chai.request(api)
      .post('/api/users/')
      .send({ email: 'testadmin@admin.com', password: 'admin', name: 'admin', role: 'admin' })
      .then((res) => {
        console.log('test user created!');
        console.log(res.body);
      });
  // login /
  beforeEach('login admin', (done) => {
    chai.request(api)
      .post('/api/users/login')
      .send({ email: 'testadmin@admin.com', password: 'admin' })
      .then((res) => {
        token = res.body.token;
        done();
      });
      // .catch(e => {
      //   console.log('Erroring out: ', e)
      // })
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
    it('it should fail to GET user by userId', (done) => {
      chai.request(api)
      .get('/api/users/0')
      .set('access-token', token)
        .end(() => {
          expect(404);
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
      .put('/api/users/2')
      .set('access-token', token)
      .send({
        name: 'newww user'
      })
      .end(() => {
        expect(200);
        done();
      });
    });
    it('it should fail to GET user by userId', (done) => {
      chai.request(api)
      .get('/api/users/0')
      .set('access-token', token)
        .end(() => {
          expect(404);
          done();
        });
    });
    it('it should UPDATE a user by userId', (done) => {
      chai.request(api)
      .put('/api/users/2')
      .set('access-token', token)
      .send({
        name: ''
      })
      .end(() => {
        expect(400);
        done();
      });
    });
  });
  describe('/GET users/:userId', () => {
    it('it should PAGINATE users', (done) => {
      chai.request(api)
      .get('/api/users/?limit=2&offset=0')
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
      .get('/api/search/users/?q=admin')
      .set('access-token', token)
      .end(() => {
        expect(200);
        done();
      });
    });
  });
});
