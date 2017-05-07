//const pug = require('pug');

module.exports = {
  process(src, filePath) {
    console.log('here');
    try {
      //const template = pug.compile(src);
      //const html = template();
      //const content = JSON.stringify(html);
      //return `module.exports = 'success';`;
    } catch (error) {
      //return `module.exports = 'error';`;
    }
    return `module.exports = 'success';`;
  },
};
