describe('POC', () => {
  beforeAll(() => {
    const html = require('../index.pug');
    document.body.innerHTML = html;
  });

  it('exists', () => {
    expect(document.querySelector('#anchor').textContent).toBe('Some Text');
  });
});
