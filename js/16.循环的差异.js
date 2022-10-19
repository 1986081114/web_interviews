/* 
forEach：

forEach(backcakll(val, index, arr), thisArg)
forEach()方法对数组的每一个元素执行一次给定的函数
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
arr：正在执行的数组
thisArg： 可选参数， 当执行callback时，用作this的值
不能改变原数组， 无返回值
会跳过空值
async/await 不能使用 forEach

this,有thisArg this指向它
如果没有
  如果回调函数是箭头函数， this指向{}
  如果回调函数是普通函数， this指向 全局
*/
/* 
实现 forEach
Array.prototype.forEach = function(callback) {
    for(let index = 0; index < this.length; index++){
        callback(this[index], index,this)
    }
}

async/await 不能使用 forEach，因为按照如上写法， 每一个function都应该是async的
async () => {
    array.forEach(async element => {
        const result = await new Promise(res => setTimeout(() => { res(element) }, 1000))
        console.log(result)
    })
})()}
创意一个forEachAwait（）

*/

/* 
for in 打印索引值， 会跳过空值
*/
/* 
for of  打印值， 不会跳过空值
*/
/* 

for  ，没有跳过空值
*/


const array = [1, 2, , 4, 5, 6, 7, 8, , 10, 11];

for (let index = 0; index < array.length; index++) {
    const element = array[index]
    console.log(element) // 没有跳过空值  打印undefined, 
    if (index == 4) break
    console.log(this) //window
}
console.log('------------------------------')
// a  c
array.forEach(function (element) {
    if (element == 4) return //不能使用break
    console.log(element) // 跳过空值
    console.log(this)//this是array
}, array)
console.log('------------------------------')
// a c testing 空格
for (const key in array) {
    if (key == 4) break
    console.log(array[key]) // 跳过空值 ，全部打印出来了
    console.log(this)//window
}
console.log('------------------------------')

for (const iterator of array) {
    if (iterator == 4) break
    console.log(iterator) // 没有跳过空值，
    console.log(this)//window
}
let arr = array.map((value) => {
    if (value == 4) return
    console.log(value)
    return value
})
console.log(arr) //[ 1, 2, <1 empty item>, undefined, 5, 6, 7, 8, <1 empty item>, 10, 11 ]
/*
for(), for of, 不会跳过空的元素，返回undefined， map在运行中不能打印空值，跳过， 但是再返回中包含空值， forEach跳过空值
for（）可以中途跳出循环， foreach不能中途跳出循环，且不能使用break，for of可以跳出循环,map 也不能跳出循环， 且不能使用break；
map foreach区别：
    foreach不会返回结果，而是undefined，会改变原数组
    map不会改变原数组，返回一个新的数组

*/
/*
for...in：可迭代对象
   遍历的索引为字符串类型，
   遍历顺序可能不是按照数组排序（随机排序）
   使用for..in会遍历数组所有的可枚举熟悉感包括原型
for..of能数组和具有迭代性的对象，不包括原型的name和方法，

*/

/*

forEach 使用return只是跳出本次循环 foreach()不能使用break和continue这两个关键字

中断方法：

使用try监视代码块，在需要中断的地方抛出异常。 throw Error();


官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环

let a = [1,2,3,4]
a.some((val) => {
    if(val == 3) {
        return true
    }
    console.log(val)

})

var ages = [3, 10, 18, 20];

 function checkAdult(age) {
     return age >= 18;
 }

 function myFunction() {
     console.log(ages.some(checkAdult));
 }
 myFunction()
*/
