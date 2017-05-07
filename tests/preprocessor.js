const pug = require('pug');

const locals = filename => ({
  filename,
  files: {
    js: [''],
    css: [''],
  },
});

module.exports = {
  process(src, filePath) {
    try {
      const template = pug.render(src, locals(filePath));
      console.log('template ', template);
      //const html = template();
      //const content = JSON.stringify(html);
      //return `module.exports = 'success';`;
    } catch (error) {
      console.log(error);
      //return `module.exports = 'error';`;
    }
    return `module.exports = 'success';`;
  },
};
