
/*
flat 用于将数组拉平，变成一维数组， 返回一个新的数组，对原数组没有影响
 不传入参数，默认一层，可以传入一个整数，代表拉平的层数
 如果值《=0，但会原数组，不拉平
 Infinity转成一维数组
 如果原数组有空位，会跳过空位。
*/
//实现flat
/* 
在数组中找到数组类型的元素吗然后展开
1.遍历数组中的每一个元素
2.判断元素是否是数组
3.将数组元素展开到一层
[].concat(...arr)
concat + apply   [].concat.apply([],arr)
*/
const arr = [1, 2, [3, 4], [1, 2, 3, [1, 2, 3, [1, 2, 3]]], , 5, "string", { name: "你好" }];
console.log(arr.flat(Infinity))//
//1.实现方法
function flat1(arr) {
    let arrRes = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            //callee 是 arguments 对象的一个属性。它可以用于引用该函数的函数体内当前正在执行的函数。
            arrRes = arrRes.concat(arguments.callee(item))
        } else {
            arrRes.push(item)
        }
    })
    return arrRes
}
console.log(flat1(arr))

//2.使用reduce实现
const flat2 = arr => {
    return arr.reduce((pre, curr) => {
        return pre.concat(Array.isArray(curr) ? flat2(curr) : curr)
    }, [])
}
console.log(flat2(arr))

//3.使用栈实现 不跳过空
function flat3(arr) {
    let arrRes = [];
    const stack = [].concat(arr)//将数组元素拷贝到栈，直接赋值会改变原数组；
    while (stack.length) {
        const val = stack.pop();
        if (Array.isArray(val)) {
            stack.push(...val); //如果是数组在入栈，并且展开了一层
        } else {
            arrRes.unshift(val)
        }
    }
    return arrRes
}
console.log(flat3(arr))

//传入参数控制层数 reduct  +递归
function flat4(arr, num = 1) {
    return num > 0
        ? arr.reduce(
            (pre, cur) =>
                pre.concat(Array.isArray(cur) ? flat4(cur, num - 1) : cur),
            []
        )
        : arr.slice();
}
console.log(flat4(arr, Infinity))