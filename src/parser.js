const regexp = require('./regExp');
const ditect = require('./ditect');

class Parser {
    constructor() {
        this.tree = [];
    }

    md_block(input, line) {
        let str = new String(input);
        str.line = line;
        return str;
    }

    code_line(str) {
        return str.split(/\n/).length - 1;
    }

    split_blocks(input) {
        input = input.replace(/\r\n?/g, '\n');
        let blocks = [];

        let m;
        let line_no = 1;
        
        while((m = regexp.line.exec(input)) !== null) {
            // console.log(m);
            blocks.push(this.md_block(m[1], line_no));
            line_no += this.code_line(m[0]);
            // regexp.line.lastIndex += m[0].length;
        }

        return blocks;
    }

    // 处理block，输出对应类型对象
    processBlock(block, next) {
        for (let key of ditect.keys) {
            let r = ditect[key](block, next);

            if (r) {
                return r;
            }
        }
        return undefined;
    }

    toTree(input) {
        let blocks = this.split_blocks(input);
        console.log(blocks);
        console.log('=====================================');
        while(blocks.length) {
            let block = blocks.shift();
            let r = this.processBlock(block, blocks);

            if (r) {
                this.tree.push(r);
            }
        }
        console.log(this.tree);
        return this.tree;
    }
}

module.exports = new Parser();