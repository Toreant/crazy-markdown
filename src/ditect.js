const regexp = require('./regExp');

class Ditect {
    constructor() {
        this.keys = [
            'atxHeader',
            'tabcode',
            'code',
        ];
    }

    push_line(re, input, cb) {
        let b = input.valueOf();
        let m;
        while (b.length && (m = re.exec(input)) !== null) {
            b = b.substr(m[0].length);
            cb(null, m);
        }
        return b;
    }

    /**
     * 输入block,输出Ditect对象
     * [
     *  TAG,
     *  [
     *      CONTENT
     *  ],
     *  {
     *      // OPTIONS
     *  },
     *  LINE
     * ]
     */

    /**
     * 输出
     * @param {*} block 
     */
    atxHeader(block) {
        let m = regexp.headerline.exec(block.toString());
        if (!m) {
            return undefined;
        }

        return [
            'header',
            [ m[2] ],
            {
                type: m[1].length
            },
            block.line
        ];
    }

    tabcode(block, next) {
        let m = regexp.tabCode.exec(block.toString());
        if (!m) {
            return undefined;
        }

        let ret = [];
        let line = block.line;

        while (next.length) {
            // let m = regexp.tabCode.exec(block.valueOf());
            // console.log(m);
            let b = this.push_line(regexp.tabCode, block.valueOf(), function (err, r) {
                ret.push(r[1]);
            });

            if (!b) {
                break;
            } else if (next.length) {
                if (!next[0].match(regexp.tabCode)) {
                    break;
                }
                block = next.shift();
            } else {
                break;
            }
        }

        return [
            'codeblock',
            [
                ret.join('\n')
            ],
            {
                type: 'block'
            },
            line
        ];
    }

    code(block, next) {
        let m = regexp.dotCode.exec(block.valueOf());
        if (!m) {
            return undefined;
        }

        let ret = [];
        let line = block.line;
        let dotCount = 0;
        let type;

        while(true) {
            // 一直遍历blocks， 直到``````或````闭合
            let b = this.push_line(regexp.dotCode, block.valueOf(), function (err, r) {
                if (r[1] || r[3]) {
                    if (r[1] === '```') {
                        type = 'block';
                    } else if (r[1] === '``') {
                        type = 'inline';
                    } 
                    dotCount += 1;
                    ret.push(r[2]);
                }
            });

            if (dotCount >= 2) {
                break;
            } else if (!next.length) {
                break;
            } else {
                block = next.shift();
            }
        } 

        return [
            'code',
            [
                ret.join('\n')
            ],
            {
                type: type
            },
            line
        ];
    }
}

module.exports = new Ditect();