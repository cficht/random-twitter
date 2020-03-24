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

  it('gets all tweets', () => {
    const tweets = [
      { handle: 'Chris', text: 'Awesome stuff!' },
      { handle: 'Frank', text: 'Awesomer stuff!' }
    ];

    return Tweet.create(tweets)
      .then(() => {
        return request(app)
          .get('/api/v1/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);

        tweets.forEach(tweet => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            ...tweet,
            __v: 0
          });
        });
      });
  });

  it('gets tweet by id', () => {
    return Tweet.create({
      handle: 'Chris', 
      text: 'Awesome stuff!'
    })
      .then(tweet => {
        return request(app)
          .get(`/api/v1/tweets/${tweet.id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'Chris', 
          text: 'Awesome stuff!',
          __v: 0
        });
      });
  });

  it('updates a tweets text', () => {
    return Tweet.create({
      handle: 'Chris', 
      text: 'Awesome stuff!'
    })
      .then(tweet => {
        return request(app)
          .patch(`/api/v1/tweets/${tweet.id}`)
          .send({ text: 'Not so awesome stuff!' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'Chris', 
          text: 'Not so awesome stuff!',
          __v: 0
        });
      });
  });

});
