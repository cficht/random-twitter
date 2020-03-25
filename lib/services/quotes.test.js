const getQuote = require('./quotes');

jest.mock('superagent', () => {
  return {
    get() {
      return Promise.resolve ({
        body: ['Turkey can never beat cow.']
      });
    }
  };
});

describe('get quotes function', () => {
  it('gets a ron swanson quote', () => {
    return getQuote()
      .then(quote => {
        expect (quote).toEqual('Turkey can never beat cow.');
      });
  });
});
