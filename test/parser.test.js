const fs = require('fs');
const path = require('path');

const parser = require('../src/parser');

let content = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf-8');
parser.toTree(content);
