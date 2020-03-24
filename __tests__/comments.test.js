require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comment');
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

  it('creates a comment', () => {
    return Tweet.create({
      handle: 'Chris',
      text: 'Awesome stuff!'
    })
      .then(tweet => {
        return request(app)
          .post('/api/v1/comments')
          .send({ comment: 'lol', tweet: tweet._id })
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: 'lol',
          tweet: expect.any(String),
          __v: 0
        });
      });
  });

});
