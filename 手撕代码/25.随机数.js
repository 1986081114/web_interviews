//random 随机生成0-1的随机数
/* 
  Math.ceil(Math.random()*10) 获取从1到10的随机整数，取0的概率极小 
  Math.floor(Math.random()*10) 均衡获取0到9的随机整数
  Math.round(Math.random()*10) 随机获取0到9的随机整数 其中获取最小值 0 和最大值 10 的几率少一半。

*/

/* 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，
   要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。 */

//按照最大最小生成
/* function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min + 1)) + min

} */
//按照长度生成
function getRandom(len) {
    let a = [];
    for (let i = 0; i < len; i++) {
        a.push(Math.floor(Math.random() * 100))
    }
    a = Array.from(new Set(a));
    a.sort((a, b) => {
        return a - b
    })
    return a
}

/* //去重
//arr = [...new Set(arr)]
arr = Array.from(new Set(arr))
arr.sort((a, b) => {
    return a - b
})
 */
//按照连续的数存为一组
function continueArray(arr) {

    return arr.reduce((res, c, i, arr) => {
        if (i === 0) {
            res[0].push(c)
        } else {
            if (arr[i - 1] !== c - 1) res.push([])
            res[res.length - 1].push(c)
        }
        return res

    }, [[]])
}

//按照 0-9 10-19排序
function regionArray(array) {
    let res = []
    arr.map((i) => {
        let index = parseInt(i / 10);
        if (!res[index]) {
            res[index] = []
        }
        res[index].push(i)
    })
    return res
}

let arr = getRandom(10)
let res1 = continueArray(arr)
let res2 = regionArray(arr)
console.log(res1)
console.log(res2)