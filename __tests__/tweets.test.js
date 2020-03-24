require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');


describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ handle: 'Chris', text: 'Awesome stuff!' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'Chris', 
          text: 'Awesome stuff!',
          __v: 0
        });
      });
  });

});
