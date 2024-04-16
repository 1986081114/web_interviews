/* 
文本， 输入文本将文本追加到当前行的末尾，光标在输入字符时候一直向后移动，在末尾， backspace删除当前行最后一个字符。

字符应该包括的信息有，字符串， 位置（x， y），用户当前在文本输入的位置caret
*/

function TextLine(x, y) {
    this.text = '';
    this.left = x;
    this.bottom = y;
    this.caret = 0;

    this.insert = function(insertext) {
        let first = this.text.slice(0, this.caret),
            last = this.text.slice(this.caret);

        first += insertext;
        this.text = first;
        this.text += last;
        this.caret += insertext.length;
    }

    this.getCareX = function(context) {
        let s = this.text.substring(0, this.caret),
            w = context.measureText(s).width;
        return this.left + w
    }

    this.removeCharacterBeforeCaret = function() {
        if(this.caret === 0) return;

        this.text = this.text.substring(0, this.caret - 1)
                    + this.text.substring(this.caret);
        this.caret--; 
    }
}