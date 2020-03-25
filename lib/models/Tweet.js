const mongoose = require('mongoose');
const getQuote = require('../services/quotes');

const schema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  }
});

schema.pre('save', function(next) {
  if(this.text) return next();

  getQuote()
    .then(quote => this.text = quote)
    .then(() => next());
});

module.exports = mongoose.model('Tweet', schema);
