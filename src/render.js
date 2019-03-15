const regExp = require('./regExp');
const { logger } = require('./utils/logger');

class Render {
    renderText(txt) {
        txt = this.renderHead(txt);
        txt = this.renderCode(txt);
        txt = this.renderInline(txt);
        txt = this.renderQuote(txt);
        txt = this.renderBold(txt);
        txt = this.renderItalic(txt);
        txt = this.renderLink(txt);
        txt = this.renderImg(txt);
        txt = this.renderList(txt);
        txt = this.renderNumberList(txt);

        return txt;
    }

    renderHead(txt) {
        // render the header
        let r;
        while((r = regExp.headerline.exec(txt)) !== null) {
            let _headerType = r[1].length;
            txt = txt.replace(r[0], `<h${_headerType} class="head">${r[2].trim()}</h${_headerType}>`);
        }
        return txt;
    }

    renderInline(txt) {
        let r;
        // render the inline
        while((r = regExp.inline.exec(txt)) !== null) {
            txt = txt.replace(r[0], `<span class="inline-code"><code>${r[1].trim()}</code></span>`);
        }
        return txt;
    }

    renderCode(txt) {
        // render the code
        let r;
        while((r = regExp.code.exec(txt)) !== null) {
            console.log(r[1]);
            txt = txt.replace(r[0], `<pre class="code"><code>${r[1].trim()}</code></pre>`)
        }
        return txt;
    }

    renderQuote(txt) {
        // render the quote
        let r;
        while((r = regExp.quote.exec(txt)) !== null) {
            let lines = r[0].split('\n');
            let _html = []

            for (let line of lines) {
                let _quoteItem = regExp.quoteItem.exec(line);
                if (_quoteItem) {
                    _html.push(_quoteItem[1].trim());
                }
            }

            txt = txt.replace(r[0], `<blockquote class="blockquote"><p>${_html.join('</br>')}</p></blockquote>`);
        }
        return txt;
    }

    renderBold(txt) {
        let r;
        // render the bold
        while((r = regExp.bold.exec(txt)) !== null) {
            txt = txt.replace(r[0], `<span class="bold">${r[1]}</span>`);
        }
        return txt;
    }

    renderItalic(txt) {
        let r;
        // render the italic
        while((r = regExp.italic.exec(txt)) !== null) {
            txt = txt.replace(r[0], `<span class="italic">${r[1]}</span>`);
        }
        return txt;
    }

    renderLink(txt) {
        let r;
        while((r = regExp.link.exec(txt)) !== null) {
            txt = txt.replace(r[0], `<a class="link" href="${r[2]}">${r[1]}</a>`);
        }
        return txt;
    }

    renderImg(txt) {
        let r;
        while((r = regExp.img.exec(txt)) !== null) {
            txt = txt.replace(r[0], `<img class="block-img" src="${r[3]}" alt="${r[2]}"/>`);
        }
        return txt;
    }

    renderList(txt) {
        let r;
        while((r = regExp.list.exec(txt)) !== null) {
            let lines = r[0].split('\n');
            let _html = [];

            for (let line of lines) {
                let _listItem = regExp.listItem.exec(line);
                if (_listItem) {
                    _html.push(`<li>${_listItem[1].trim()}</li>`);
                }
            }

            txt = txt.replace(r[0], `<ul class="ul">${_html.join('')}</ul>`);
        }

        return txt;
    }

    renderNumberList(txt) {
        let r;
        while((r = regExp.numberList.exec(txt)) !== null) {
            let lines = r[0].split('\n');
            let _html = [];
            for (let i = 1; i <= lines.length; i++) {
                let _numberListItem = regExp.numberListItem.exec(lines[i - 1]);
                if (_numberListItem) {
                    _html.push(`<li>${_numberListItem[1].trim()}</li>`);
                }
            }
            txt = txt.replace(r[0], `<ol class="ol">${_html.join('')}</ol>`);
        }
        return txt;
    }
}

module.exports = new Render();