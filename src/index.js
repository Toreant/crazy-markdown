const fs = require('fs');
const path = require('path');
const render = require('./render');

function parse(txt) {
    let html = render.renderText(txt);
    return html;
}

function generateHTML(txt, config = {}) {

    let _config = Object.assign({}, {
        style: path.resolve(__dirname, './content/style.css'),
        targetSrc: path.resolve(__dirname, '../output/index.html')
    }, config);

    let content = parse(txt);
    let html = fs.readFileSync(path.resolve(__dirname, './content/index.html'), 'utf-8');
    let stylePath = _config.style;
    let style = fs.readFileSync(stylePath, 'utf-8');
    html = html.replace('<style></style>', `<style>\n${style}</style>`);
    html = html.replace('<body></body>', `<body>${content}</body>`);

    try {
        fs.mkdirSync(path.resolve(__dirname, '../output'));
    } catch (exp) {
        console.info(exp.toString());
    }
    fs.writeFileSync(_config.targetSrc, html, 'utf-8');
}   

module.exports = {
    parse,
    generateHTML
}