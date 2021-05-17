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


array = ['a', , 'c']

array.test = 'testing'
array.test1 = ''
console.log(array) // [ 'a', , 'c', test: 'testing',test: '' ]
for (let index = 0; index < array.length; index++) {
    const element = array[index]
    console.log(element) // 没有跳过空值  打印undefined, 但不会打印 testing “ ”
    console.log(this) //{}
}
console.log('------------------------------')
// a  c
array.forEach(function (element) {
    console.log(element) // 跳过空值 没有打印 testing， “ ”
    console.log(this)
}, array)
array.forEach(element => {
    console.log(this) // {}
})
console.log('------------------------------')
// a c testing 空格
for (const key in array) {
    console.log(array[key]) // 跳过空值 ，全部打印出来了
    console.log(this)//{}
}
console.log('------------------------------')
// a undefined c
for (const iterator of array) {
    console.log(iterator) // 没有跳过空值，也没有打印 testing
    console.log(this)//{}
}
/*
map foreach区别：
    foreach不会返回结果，而是undefined，会改变原数组
    map不会改变原数组，返回一个新的数组

*/
