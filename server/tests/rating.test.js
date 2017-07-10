import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Rating API', () => {
  const timestamp = new Date().getTime().toString();
  let rating = {
    feedback: {
      rating: 1,
    },
    settings: {
      activeProject: 'activeProject',
      maxSentenceCount: 2
    },
    data: {
      query: 'query',
      summary: 'summary',
      links: ['a', 'b', 'c']
    },
    algorithmAndTime: `algorithm${timestamp}`,
    algorithm: 'algorithm',
    time: timestamp
  };

  describe('# POST /api/ratings', () => {
    it('should create a new rating', (done) => {
      request(app)
        .post('/api/ratings')
        .send(rating)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.algorithm).to.equal(rating.algorithm);
          expect(res.body.feedback.rating).to.equal(rating.feedback.rating);
          rating = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/ratings/:ratingId', () => {
    it('should get rating details', (done) => {
      request(app)
        .get(`/api/ratings/${rating._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.ratingname).to.equal(rating.ratingname);
          expect(res.body.mobileNumber).to.equal(rating.mobileNumber);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when rating does not exists', (done) => {
      request(app)
        .get('/api/ratings/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/ratings/:ratingId', () => {
    it('should update rating details', (done) => {
      rating.algorithm = 'newAlgorithm';
      request(app)
        .put(`/api/ratings/${rating._id}`)
        .send(rating)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.algorithm).to.equal('newAlgorithm');
          expect(res.body.feedback.rating).to.equal(rating.feedback.rating);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/ratings/', () => {
    it('should get all ratings', (done) => {
      request(app)
        .get('/api/ratings')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all ratings (with limit and skip)', (done) => {
      request(app)
        .get('/api/ratings')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/ratings/', () => {
    it('should delete rating', (done) => {
      request(app)
        .delete(`/api/ratings/${rating._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.feedback.rating).to.equal(1);
          expect(res.body.algorithm).to.equal('newAlgorithm');
          done();
        })
        .catch(done);
    });
  });
});
