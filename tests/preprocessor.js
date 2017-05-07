const pug = require('pug');

module.exports = {
  process(source, filename) {
    const fn = pug.compile(source, { filename });
    return `module.exports = '${fn()}';`;
  },
};
