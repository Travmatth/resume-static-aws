describe('Calculator page integration test', function() {

  describe('Page', function() {

    before(function(browser, done) {
      done();
    });

    after(function(browser, done) {
      browser.end(function() {
        done();
      });
    });

    afterEach(function(browser, done) {
      done();
    });

    beforeEach(function(browser, done) {
      done();
    });

    it('user can enter equations and see the window update', function(browser) {
      const client = browser.url(`${browser.launchUrl}/`).waitForElementVisible('main', 1000)

      // client.expect.element('body').to.be.present.before(1000);
      client
        .click('button[data-key=1]')
        .click('[data-key="+"]')
        .click('[data-key=2]')
        .click('[data-key="-"]')
        .click('[data-key=3]')
        .click('[data-key="/"]')
        .click('[data-key=4]')
        .click('[data-key="x"]')
        .click('[data-key=5]')
        .click('[data-key=6]')
        .click('[data-key=7]')
        .click('[data-key=8]')
        .click('[data-key="."]')
        .click('[data-key=9]')
        .assert.valueContains('div.window', '1 + 2 - 3 / 4 x 5678.9')

      // client.setValue('input[type=text]', ['nightwatch', client.Keys.ENTER])
      //   .pause(1000)
      //   .assert.containsText('#main', 'Night Watch');
    });
  });
});