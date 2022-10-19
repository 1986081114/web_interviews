/* 1.定义：
   所谓类数组，是一种类似数组的对象，并提供一种用于访问原始二进制数据的机制，并不是真正的数组。
    就是可以通过索引访问元素，并且拥有length属性的对象。
    arguments 是一个经典的类数组对象 arguments.callee指向arguments

    拥有length属性
    可以使用数字下表访问对象,可以遍历
    不能使用数组原型方法，如slice，pop
    instanceof不属于 Array而是Object

    常见的类数组还有：
     用getElementsByTagName/ClassName()获得的HTMLCollection
     用querySelector获得的nodeList


    转换为真数组，
     var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
    // 1. slice
    Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"]
    // 2. splice
    Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"]
    // 3. ES6 Array.from
    Array.from(arrayLike); // ["name", "age", "sex"]
    // 4. apply
    Array.prototype.concat.apply([], arrayLike)
    5. 解构
    [...arrayList]
  
     


     new Array（）接受的参数
       elementN，根据给定的元素创建一个js数组
       arrayLength， 0-2的32次幂-1之间的整数， 不包含任何元素（不包含undefined） */

/*
arguments

  arguments.callee指向自己

  2.域参数绑定
     function foo(name, age, sex, hobbit) {

console.log(name, arguments[0]); // name name

// 改变形参
name = 'new name';

console.log(name, arguments[0]); // new name new name

// 改变arguments
arguments[1] = 'new age';

console.log(age, arguments[1]); // new age new age

// 测试未传入的是否会绑定
console.log(sex); // undefined

sex = 'new sex';

console.log(sex, arguments[2]); // new sex undefined

arguments[3] = 'new hobbit';

console.log(hobbit, arguments[3]); // undefined new hobbit

}
foo('name', 'age')
传入参数，形参域arguments共享参数，没有传入参数， arguments和形参不会共享
*/