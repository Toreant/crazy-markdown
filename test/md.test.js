const fs = require('fs');
const path = require('path');
const regExp = require('../src/regExp');
const { expect } =  require('chai');

describe('md text', function () {
    describe('#code block', function () {
        it('should return not null', function () {
            let text = fs.readFileSync(path.resolve(__dirname, '../README.md'), 'utf-8');
            let r = regExp.code.exec(text);
            expect(r).to.not.equal(null);
        });
    });
});