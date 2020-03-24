const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  });

// POST /api/v1/tweets to create a new tweet
// GET /api/v1/tweets to get all tweets
// GET /api/v1/tweets/:id to get a tweet by ID
// PATCH /api/v1/tweets/:id to update a tweets text ONLY
// DELETE /api/v1/tweets/:id to delete a tweet

