const fs = require('fs');
const path = require('path');

const projectFiles = [];

const intendedProjectFile = file => {
  return !/(mp3|wav|scss|pug|pegjs|swp|arithmetic.js|aws.js|api_keys.js|deploy.js|modifyFiles.js)$/.test(
    file,
  );
};

const write = files => {
  for (let file of files) {
    const text = fs.readFileSync(file, 'utf8').split('\n');
    const first = text[0];
    const second = text[1];

    if (!first || !second) continue;
    if (!/\/\* \@flow \*\//.test(first) && !/'use strict'/.test(second)) {
      console.log('writing to file: ', file);
      text.unshift("'use strict';");
      text.unshift('/* @flow */');
      fs.writeFileSync(file, text.join('\n'), 'utf8');
    }
  }
};

const recurse = (src, depth) => {
  const root = fs.readdirSync(src);
  const dirs = root.filter(file =>
    fs.statSync(path.join(src, file)).isDirectory(),
  );
  const files = root.filter(file => fs.statSync(path.join(src, file)).isFile());

  if (files && depth != 0) {
    for (let file of files) {
      if (intendedProjectFile(file)) projectFiles.push(src + '/' + file);
    }
  }

  if (dirs) {
    for (let dir of dirs) {
      const desiredDir = depth === 0 && /^(src|tools)$/.test(dir);
      const shouldRecurse = desiredDir || depth != 0;
      const name = src === '.' ? dir : src + '/' + dir;
      if (shouldRecurse) recurse(name, depth + 1);
    }
  }
};

if (require.main === module) {
  recurse('.', 0);
  write(projectFiles);
}
