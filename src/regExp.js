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
    }
}

module.exports = new RegExpParser();