/* 
   1. 数值分隔符
      较长的数值允许没三位添加一个分隔符,es6允许数值使用下划线（_）分隔
*/
    console.log(123000 === 123_000) // true
    console.log(1_23000 === 123_000) // true
    // 注意点：
        // 分隔符不能放在最前面和最后面
        // 不能多个分隔符连在一起
        // 小数点前后不能有分隔符
        // 科学记数法e前后不能有分隔符
      

// 2. Number.isFinite() // 判断数值是否是有限的
    console.log(Number.isFinite(15)) // true
    console.log(Number.isFinite(true)) // false
    console.log(Number.isFinite('abc')) // false
    console.log(Number.isFinite(Infinity)) // false
    console.log(Number.isFinite(NaN)) // false
    
// 3. Number.isNaN() // 判断一个值是否为NaN。 
    console.log(Number.isNaN(15)) // false
    console.log(Number.isNaN(true)) // false
    console.log(Number.isNaN('abc')) // false
    console.log(Number.isNaN(Infinity)) // false
console.log(Number.isNaN(NaN)) // true

// 他们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number（）将非数值的值转成数值在判断
// 而这两个新方法只对数值有效，，非数值一律返回 false
    console.log(isFinite(15)) // true
    console.log(isNaN("NaN")) // true
    console.log(isNaN(15)) // false
    
// 4. Number.parseInt()
// 5. Number.parseFloat()
console.log(Number.parseInt(12.34)) // 12 
console.log(Number.parseInt('asv')) // NaN
console.log(parseInt(12.34)) //12
console.log(Number.parseFloat(12.34111)) // 12.34111
console.log(Number.parseFloat('12.34111&')) // 12.34111
console.log(parseFloat('12.34111&')) // 12.34111
// 相比于传统方法， 行为没有改变，只是从全局移步到局部，减少全局方法，使得语言逐步模块化

// 6. Number.isInteger() 判断是否是整数
console.log(Number.isInteger(12.22)) // false
console.log(Number.isInteger(12.000)) // true

// 7.Number.EPSILON极小的常量 表示1与大于1的最小浮点数之间的差, js能够表示的最小精度，误差小于这个可以算做没误差
    // 引入的目的是 设置误差范围，知道浮点数计算是否准确
    // 比如误差范围设为 2的-50次方 Number.EPSILON * Math.pow(2, 2)

