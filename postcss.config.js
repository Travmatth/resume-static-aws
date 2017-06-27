/* @flow */

// Used by the postcss plugin to set autoprefixing of css
module.exports = {
  autoprefixer: {
    browsers: ['> 5% in US'],
  },
  // The plugins section is used by postcss-loader with webpack
  plugins: [require('autoprefixer')],
};
