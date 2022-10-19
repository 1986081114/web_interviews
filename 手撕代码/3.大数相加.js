/* 
js存放整数有个范围，一旦超出这个范围就会丢失精度,所以用字符串表示数字
js的number类型遵循ieee754规范， 意味着精度表示是有限的， 超过这个精度和就不准确了

*/
let a = '1234569876543212345';
let b = '97654323498';
function add(a, b) {
    //  用0补充使得两个字符串长度一样
    while (a.length > b.length) b = '0' + b
    while (a.length < b.length) a = '0' + a;
    let tem = 0;
    let carry = 0; //进位
    let res = ''
    for (let i = a.length - 1; i >= 0; i--) {
        tem = parseInt(a[i]) + parseInt(b[i]) + carry;
        carry = Math.floor(tem / 10);
        res = tem % 10 + res
    }
    if (carry === 1) {
        res = '1' + res
    }
    return res
}
console.log(add(a, b))