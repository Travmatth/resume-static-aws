module.exports = {
  process(src) {
    return `
      module.exports = '${JSON.stringify(src).replace(/^\s+|\s+$/g, '')}';
    `;
  },
};
