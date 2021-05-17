/* var xhr = new XMLHttpRequest();
//设置请求参数（请求方式，请求页面的相对路径，是否异步）
xhr.open('get', 'aaa.com', true);
xhr.send(null);
xhr.onreadystatechange = function () {
    //4： 响应已完成: 内容解析完成，可以在客户端调用
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
} */

/* function parent(n) {
    let res = []
    function parenrthese(res, left, right) {
        if (left == 0 && right == 0) {
            return res
        }
        if (left < right && right > 0) {
            res.push(')')
            parenrthese(res, left, right - 1)
        }
        if (left > 0) {
            res.push('(');
            parenrthese(res, left - 1, right)
        }

    }
    parenrthese(res, n, n)
    return res

}

let rest = parent(2)
console.log(rest) */

var generateParenthesis = function (n) {
    const res = [];

    const dfs = (lRemain, rRemain, str) => {
        if (str.length == 2 * n) {
            res.push(str);
            return;
        }
        if (lRemain > 0) {
            dfs(lRemain - 1, rRemain, str + "(");
        }
        if (lRemain < rRemain) {
            dfs(lRemain, rRemain - 1, str + ")");
        }
    };

    dfs(n, n, "");
    return res;
}
console.log(generateParenthesis(2))
