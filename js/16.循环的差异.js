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



function myMap(array, callback) {
    const result = [];
  
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i], i, array));
    }
  
    return result;
  }
  
  function myForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }
  
/*
for(), for of, 不会跳过空的元素，返回undefined， map在运行中不能打印空值，跳过， 但是再返回中包含空值， forEach跳过空值
for（）可以中途跳出循环， foreach不能中途跳出循环，且不能使用break，for of可以跳出循环,map 也不能跳出循环， 且不能使用break；
map foreach区别：
    foreach 对数组的每个元素都执行一次提供的函数 所以不会返回结果，而是undefined，
    map不会改变原数组，返回一个新的数组,这个新数组的值由原数组的每个元素都调用过一次提供的函数后返回
    foreach可以跳出循环，return 语句可以当前回调函数中返回，而map不能，只能遍历完整个数组。
    forEach 方法无法通过使用 break 语句来中断循环
    foreach不支持链式调用，而map支持链式调用，可以继续对返回的新数组进行操作。
    基本数据类型 foreach和map都不改变原数组;
    复杂数据类型，都会改变原数组
    // forEach 和 map 方法时，对引用类型元素的修改会直接反映在原始数组中。
// 这是因为引用类型的元素实际上存储的是引用（内存地址），而非值本身。因此，通过引用可以访问和修改原始数组中的元素。

*/

// 如果数组里面的类型是基础类型- 不会改变

let array1 = [1, 2, 3, 4];
array1.forEach(item => {
    item = item + 1;
});
console.log('foreach 不会改变基础类行数组', array1); // [ 1, 2, 3, 4 ]

let array2 = array1.map(item => {
    return item += 1;
})
console.log('map 不会改变基础类行数组', array1, array2); //[ 1, 2, 3, 4 ]

// 如归数组内是引用类型 - 会改变
let arr3 = [
    {
        name: 'shaka',
        age: 23
    }, {
        name: 'virgo',
        age: 18
    }
]
let arr4 = arr3.forEach(item => {
    if (item.name === 'shaka') {
         item.age = 100
    }
    return item;
})
console.log('foreach 会改变引用类型', arr3, arr4);

let arr5 = arr3.map(item => {
    if (item.name === 'shaka') {
        item.age = 120
   }
   return item;
})
console.log('map 会改变引用类型', arr3, arr5);



/*
for...in：可迭代对象
   遍历的索引为字符串类型，(数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”)
   遍历顺序可能不是按照数组排序（随机排序）
       let iterable = {
        'a': 'a',
        4: 'b',
        5: 'c',
            length: 3,
        
        
        };
        for (let ite in iterable) {
            console.log(ite) // 4 5 a length
        }
   使用for..in会遍历数组所有的可枚举键名包括原型
   for in 主要为对象遍历而设计

for..of能遍历数组和具有迭代性的对象，不包括原型的name和方法，
语法简介，且可以配合 return break continues使用

*/

const array6 = [1, 2, 3, 4, 5];
let sum1 = 0;

array6.forEach((element) => {
    if (element === 3) {
        return; // 使用 return 跳出循环
    }
    console.log('element', element); //1,2,4,5
    sum1 += element;
});
console.log(sum1); // 输出: 12：

const newArray = array6.map((element) => {
    if (element === 3) {
        // 使用 return 语句无法中断 map 循环
        return;
    }
    return element * 2;
});

console.log('map return ', newArray); // 输出: [2, 4, undefined, 8, 10]


/*

forEach 使用return只是跳出本次循环 foreach()不能使用break和continue这两个关键字

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

// Object.keys 遍历对象的方法
// 对于负数是作为字符串处理的，也是按照定义时候的顺序

/* object.keys 在内部会根据属性名key的类型进行不同的排序逻辑：
     如果属性名是Number， 按照key从小到大排序 
       这里顺便也纠正一个普遍的误区：有些回答说将所有属性为数字类型的 key 从小到大排序，
       其实不然，还必须要符合 「合法的数组索引」 ，也即只有正整数才行，负数或者浮点数，
       一律当做字符串处理。
     如果是string，按照属性被创建的事件升序排序
     symbol。 同string
 */
