const pug = require('pug');

module.exports = {
  process(source, filename) {
    const fn = pug.compile(source, { filename });
    const content = fn({ require: () => {} }).replace(/'/g, '');
    return `module.exports = '${content}';`;
  },
};
