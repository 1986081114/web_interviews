//获取数组下标
let kmp = (src,pattern) => {
    let s = '*' + src, p = '*' + pattern;
   let slen = src.length, plen = pattern.length;
   let next = new Array(plen).fill(0)
   let res = []
    for (let i = 2, j = 0; i <= plen; i++) {
       while (j > 0 && p[i] !== p[j + 1]) j = next[j];
       if (p[i] === p[j + 1]) j++;
       next[i] = j;
   }
    for (let i = 1, j = 0; i <= slen; i++) {
       while (j > 0 && s[i] !== p[j + 1]) j = next[j];
       if (s[i] === p[j + 1]) j++;
       if (j === plen) {
           res.push(i - plen);
           //回退后重新开始
           j = next[j];
       }
   }
   return res
}
let buf = '';
process.stdin.on('readable', () => {
   let chunk = process.stdin.read();
   if (chunk) buf += chunk.toString();
});
let getInputArgs = line => line.split(' ').filter(s => s !== '').map(x => parseInt(x));
process.stdin.on('end', () => {
   let src = '', pattern = '';
   buf.split('\n').forEach((line, lineIdx) => {
       if (lineIdx === 1) {
           pattern = line;
       } else if (lineIdx === 3) {
           src = line;
           console.log(kmp(src, pattern).join(' '));
       }
   });
});
