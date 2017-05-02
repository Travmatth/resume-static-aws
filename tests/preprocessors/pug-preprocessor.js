const pug = require('pug');

module.exports = {
  process(source, filepath) {
    // compile
    //const render = pug.compile(source, { filename: filepath });

    //const locals = {
    //files: {
    //chunks: new Proxy(
    //{},
    //{
    //get(target, key) {
    //return { entry: 'filename-stub' };
    //},
    //},
    //),
    //css: 'css-stub',
    //},
    //webpack: { assetsByChunkName: { vendor: 'vendor-stub' } },
    //};

    //const file = `module.exports = '${render(locals)}'`;
    //console.log(file);
    const f = `module.exports = 'a string'`;
    return f;
  },
};
