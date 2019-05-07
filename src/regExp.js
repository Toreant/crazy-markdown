class RegExpParser {
    constructor() {
        this.headerline = /^(\#{1,6})([^\#\n]+)$/m;
        this.code = /\s*?\`{3}\n?([^\`]*)\`{3}/m;
        this.inline = /^\s?\`{2}\n?([^\`]*)\`{2}/m;
        this.quoteItem = /^\> *([^\n]*)/;
        this.quote = /((^|\n)\>\s?([^\n]*)$){1,}/m;
        this.bold = /\*{2}([^\*]*)\*{2}/;
        this.italic = /\*([^\*]*)\*/;
        this.listItem = /^\-\s?([^\n]*)/;
        this.list = /((^|\n)\-\s?([^\n]*)$){1,}/m;
        this.numberListItem = /^\d\.\s?([^\n]*)/;
        this.numberList = /((^|\n)\d\.\s([^\n]*)$){1,}/m;
        this.link = /^\[([^\]]*)\]\(([^\)]*)\)/m;
        this.img = /(^|\n|\s*)\!\[([^\]]*)\]\(([^\)]*)\)/m;

        // [\s\S] 匹配所有，包括空行，"."并不能匹配空行
        this.line = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g;
        this.tabCode = /^(?: {0,3}\t| {4})(.*)\n?/;
        this.dotCode = /(`{2,3})?([^`]*)(`{2,3})?/m;
    }
}

module.exports = new RegExpParser();