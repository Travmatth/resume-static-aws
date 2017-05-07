describe('POC', () => {
  beforeAll(() => {
    const html = require('../index.pug');
    console.log(html);
    document.body.innerHTML = html;
  });

  it('exists', () => {
    expect(document.querySelector('#anchor').textContent).toBe('Some Text');
  });
});
