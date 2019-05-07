const { expect } = require('chai');
const regExpParser = require('../src/regExp');

describe('reg tester', function () {
    describe('#headerline reg', function () {

        let headerlineExec = regExpParser.headerline;

        function _gen(count) {
            return new Array(count).fill('#').join('');
        }

        it('should return not null', function () {
            let r = headerlineExec.exec('# header1  ');
            expect(r).to.not.equal(null);
        });

        // no need
        // it('should return null when "#" has no space after', function () {
        //     let r = headerlineExec.exec('#header1  ');
        //     expect(r).to.equal(null);
        // });
        // it('should return null when the end has no two space', function () {
        //     let r = headerlineExec.exec('# header1');
        //     expect(r).to.equal(null);
        // });

        for (let i = 2; i <= 6; i++) {
            it(`should return not null when the # has ${i} items`, function () {
                let str = `${_gen(i)} header${i}  `;
                let r = headerlineExec.exec(str);
                expect(r).to.not.equal(null);
            });
        }

        // it('should return null when is "#,# header  "', function () {
        //     let r = headerlineExec.exec('#,# header  ');
        //     expect(r).to.equal(null);
        // });

        it('should return the content', function () {
            for (let i = 1; i <= 6; i++) {
                let r = headerlineExec.exec(`${_gen(i)} header${i}  `);
                expect(r).to.not.equal(null);
                expect(r[2].trim()).to.equal(`header${i}`);
            }
        });
        
    });

    describe('#code reg', function () {
        let codeRegExec = regExpParser.code;
        it('should return not null', function () {
            let r = codeRegExec.exec('```var code = 1```');
            expect(r).to.not.equal(null);
        });

        it('should return not null', function () {
            let code = `\`\`\`
            var a = 1;
            var b = 2;
            \`\`\``;

            let r = codeRegExec.exec(code);
            expect(r).to.not.equal(null);
        });
    });

    describe('#inline reg', function () {
        let inlineReg = regExpParser.inline;

        it('should return not null', function () {
            let r = inlineReg.exec('``inline``');
            expect(r).to.not.equal(null);
        });
        it('should return not null when has enter', function () {
            let r = inlineReg.exec(`\`\`
            inline
            \`\`
            `);
            expect(r).to.not.equal(null);
        });
    });

    describe('#quote reg', function () {
        let quoteReg = regExpParser.quote;
        
        it('should return not null', function () {
            let text = `> quote
            > quote2`;
            let r = quoteReg.exec(text);
            expect(r).to.not.equal(null);
        });
    });

    describe('#bold reg', function () {
        let boldReg = regExpParser.bold;
        it('should return not null', function () {
            let r = boldReg.exec('**bold**');
            expect(r).to.not.equal(null);
        });
    });

    describe('#italic reg', function () {
        let italicReg = regExpParser.italic;
        it('should return not null', function () {
            let r = italicReg.exec('*italic*');
            expect(r).to.not.equal(null);
        });
    });

    describe('#list reg', function () {
        let listReg = regExpParser.list;
        it('should return not null', function () {
            let r = listReg.exec('- list');
            expect(r).to.not.equal(null);
        });
    });

    describe('#number list reg', function () {
        let numberListReg = regExpParser.numberList;
        it('should return not null', function() {
            let r = numberListReg.exec(`
            1. yuhuajie
            2. yuhuajie
            `);
            expect(r).to.not.equal(null);
        }); 
    });

    describe('#link reg', function () {
        let linkReg = regExpParser.link;
        it('should return not null', function () {
            let r = linkReg.exec('[link](http://www.baidu.com)');
            expect(r).to.not.equal(null);
        });

        it('should return null', function () {
            let r = linkReg.exec('[]link](http://www.baidu.com)');
            expect(r).to.equal(null);
        });
    });

    describe('#img reg', function () {
        let imgReg = regExpParser.img;
        it('should return not null', function () {
            let r = imgReg.exec('![img](http://yure)');
            expect(r).to.not.equal(null);
        });
        it('should return null', function () {
            let r = imgReg.exec('![]img](http://yure)');
            expect(r).to.equal(null);
        });
    });

    describe.only('#line reg', function () {
        it('should return not null', function () {
            let content = '\ncode \r\n end';

            let r = regExpParser.line.exec(content);

            expect(r).to.not.equal(null);
        });
        it('should return not null that read the MD', function(done) {
            const fs = require('fs');
            const path = require('path');

            fs.readFile(path.resolve(__dirname, '../README.md'), 'utf-8', function (err, data) {
                data = data.replace(/\r\n?/g, "\n");
                let r = regExpParser.line.exec(data);
                console.log(r);
                expect(r).to.not.equal(null);
                done();
            })
        });
    });
});