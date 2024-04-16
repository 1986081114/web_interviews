/* 
 1. 扩展运算符 (...)
 */
 // 讲一个数组转成用括号分隔的参数序列
console.log(...[1, 2, 3])
  // 作用；
    // 1.复制数组 深拷贝
        // es5
        const a1 = [1, 2]; 
        const a2 = a1.concat(); 
        a2[0] = 2;
        a1 // [1, 2]
        
        // ES6
        const a11 = [1, 2];
        // 写法一
        const a22 = [...a1];
        // 写法二
        const [...a23] = a11; 
        
    // 2. 合并数组 浅拷贝
       // es5 
        const arr1 = ['a', 'b'];
        const arr2 = ['c'];
        arr3 = arr2.concat(arr1); 
        // es6
        arr4 = [...arr2, ...arr1]; 
        
    // 3. 与解构赋值
    const [a31, ...reset] = [1, 2, 3, 4]
       
    // 4. 字符串转成数组 .很大好处是可以识别四个字节的unicode字符
       let str = [...'hello'] // [ 'h', 'e', 'l', 'l', 'o' ]
        
    // 只要内部数据有Iterator 接口都可以使用， 即使是map， 对象
      

/* 
    2. Array.from('传入数据'， '处理每个数据的回调函数类似于map', '第三个参数绑定this')
*/
  // 用于将两类对象(array-likeobject, iterable)和 map、set转成真正的数组
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        'length': 2 // 这个一定要有才能转成真正的有值数组，否则是 []
    }
   
    //es5 
    let arr21 = [].slice.call(arrayLike); // [ 'a', 'b' ]
    // es6
    let arr22 = Array.from(arrayLike); // [ 'a', 'b' ]  
        
    // array-likeobject 类数组对象常见是 dom返回的 nodelist 和 函数内部的arguments 
    let ps = document.querySelectorAll('p');
    Array.from(ps).filter(p => { }); // nodelist集合转成数组
    let args = Array.from(arguments); // 参数转成数组
    Array.from('hello'); // iterator接口的数据结构转成数组
    Array.from(new Set(['a', 'b'])); // ['a', 'b']

    // 所谓类似于数组的对象本质特征都有一点，必须有length属性，因此任何有length属性的对象都可以通过Array.from转成数组
    // 扩展运算符也可以转成数组，但是需要这个数据有遍历器接口Iterator， 因为扩展运算符背后调用的就是iterator
    // let arr21 = Array.from({ 'length': 2 }) // [ undefined, undefined ]
    // let arr22 = [...{ 'length': 2 }] // 报错

    
    /*
      3. Array.of() 将一组值转成数组, 弥补Array的不足
    */
      Array() // []
      Array(3) // [ <3 empty items> ]
      Array(3, 11, 8) // [3, 11, 8]  
      // Array只有当参数不少于两个才会返回由参数组成的数组, 参数只有一个时实际上是指定数组长度 
      Array.of() // []
      Array.of(1) // [1]
      Array.of(1, 2) // [1, 2]  
      // 模拟实现of
      function ArrayOf() {
        return [].slice.call(arguments);
      }

    /* 
       4. copyWithin (target, start end = this.length) 浅拷贝数组中指定位置的元素覆盖到其他位置， 返回当前数组
        target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
        start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
        end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
    */
    [1, 2, 3, 4, 5, 6, 7].copyWithin(0, 2) // [3, 4, 5, 6, 7, 6, 7] 表示从2号位直到结束，覆盖从0号位开始的位置
        
    /*
      5. find((value, index, arr) => {}) 找到第一个符合条件的成员
         findIndex((value, index, arr) => {}) 返回一个符合条件成员的位置
         findlLast() 和 findLastIndex() 从数组最后一个成员开始

    */
        //  上述方法借助Object.is()可以发现NAN 弥补了数组indexOf的不足
        let in1 = [NaN, undefined, null].indexOf(NaN) // -1 
        let in2 = [NaN, undefined, null].indexOf(undefined) // 1
        let in3 = [NaN, undefined, null].indexOf(null) // 2

        let in4 = [NaN, undefined, null].findIndex(item => Object.is(NaN, item)) // 0
        let in5 = [NaN, undefined, null].findIndex(item => Object.is(undefined, item)) // 1
let in6 = [NaN, undefined, null].findIndex(item => Object.is(null, item)) // 2
        
/*
  7. fill() 使用给定值填充数组，改变原数组
    如果填充的是对象， 那么被赋值的是同一个内存地址的对象而不是深拷贝
*/
[1, 2, 3].fill(7) // [7,7, 7]
      
/*
    8. entries, values, keys 用于便利数组，返回一个遍历器对象
*/
    
/*
    9. includes(target, start, ), 返回布尔值，判断数组是否包含某个给定值
       在es5通常使用indexof判断，但是 indexOf主要含义是找到参数值第一个出现位置，再去比较判断是否是-1
       indexOf内部严格运算等运算符（===），导致对NaN误判 console.log(NaN === NaN)// FALSE
       注意和 has方法做区分
*/
//es5  
[NaN].indexOf(NaN) // -1        
// es6
[1, 2, NaN].includes(NaN) // true
      
/*
  10. 实例方法flat（拉平层数，默认1）， flatMap, 将数组拉平,默认只会拉平一层， 返回新数组， 没有副作用
   无论多少层，想要拉平一层只需要传递Infinty关键字
   flatMap对原数组每个成员执行一个函数，然后对返回值数组执行flat方法,
*/
    [1, 2, [3, 4]].flat(Infinity);
    [1, 2, , 3, 4, NaN, null, undefined].flat() // 跳过空位[ 1, 2, 3, 4, NaN, null, undefined ]
        
    [2, 3, 4].flatMap((x) => [x, x * 2]) // [2, 4, 3, 6, 4, 8]
    [1, 2, 3, 4].flatMap(x => [[x * 2]]) // [[2], [4], [6], [8]]  只能展开一层
        

/* 
   11. at 接受一个整数，返回对应位置的成员，可以接受负数, 超出范围返回undefined
     js[键名]，方括号内是键名，但是无法输入负数，at用来解决这个问题
*/

/* 
  12. 很多传统的数组方法会改变原数组，现提供新的方法，对数组操作，不改变原数组
     toReversed() toSorted()  
     toSpliced() 对应splice 用来在指定位置删除指定数量成员，并插入新成员
     with(index, value) 对应 splice(index, 1, value), 用来讲指定位置的成员替换成新的值
*/
    const arr121 = [1, 2, 3, 4]
    arr121.toSpliced(1, 2, 5, 6, 7) // [ 1, 5, 6, 7, 4]
    arr121; // [1 ,2, 3 ,4] 
    
/* 
 13. 数组空位[, , ]
    数组空位不是undefined，空位表示没有任何值

    forEach, filter, reduce, every, some 会跳过空位
    map 会跳过空位，但保留这个值
    join, toString()将空位视为undefined ，而 undefined和 null 被 处理为空字符串
*/
    [, 'a'].forEach(item => console.log(item)); // a
    console.log(['a', , 'b'].filter(item => true)); // a, b
    console.log([, 'a'].every(item => item === 'a')); // true
    console.log([1, , 2].reduce((x, y) => x + y)); // 3
    console.log([, 'a'].some(item => item !== 'a')) // false

    console.log([, 'a'].map(item => 1)); // [, 1]
    
    console.log([, 'a', undefined, null].join('#')) // #a##
    console.log([, 'a', undefined, null].toString()) // ,a,,
        
    // es6 明确空位转成undefined
    Array.from(['a', , 'b']); // [ 'a', undefined, 'b']
    [...['a', , 'b']]; // [ 'a', undefined, 'b']
        

    let arr = [1, ,]
    for (let i of arr) {
        console.log(i)
    } // 1, undefined 执行两次， 不跳过空位

    arr.map(item => {
        console.log(item)
    }) // 1, 执行一次， 跳过空位
/* 
 14. group groupToMap 数组分组
*/

/* 
  字符串转成数组
    1. split string.split(',')
    2. 展开运算符 const arr = [...string]
    3.结构赋值 const [...arr] = string;
    4.Array.from(string)
*/