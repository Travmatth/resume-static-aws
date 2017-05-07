describe('POC', () => {
  beforeAll(() => {
    document.body.innerHTML = require('../index.pug');
  });

  it('exists', () => {
    expect(document.querySelector('#anchor').textContent).toBe('Some Text');
  });
});
