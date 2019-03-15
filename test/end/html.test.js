const fs = require('fs');
const path = require('path');
const { generateHTML } = require('../../src');

let content = fs.readFileSync(path.resolve(__dirname, '../../README.md'), 'utf-8');
generateHTML(content);
process.exit();