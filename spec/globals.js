var chromedriver = require('chromedriver');

module.exports = {
  before: function(done) {
    // chromedriver.start();
    console.log('chromedriver.start');
    done();
  },

  after: function(done) {
    // chromedriver.stop();
    console.log('chromedriver.stop');
    done();
  }
}
