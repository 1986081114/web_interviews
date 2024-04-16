/* 
  1. Iterator遍历器 为不同的数据结构提供 访问能力的 接口, 任何数据结构，只要部署了
      Iterator接口，就可以完成遍历操作
    调用遍历器会返回遍历器对象，该对象根本特征是具有next方法，每次调用
    next都会返回当前成员的对象信息，具有value和 done两个属性
*/
  // 作用：
    // 1. 为各种数据结构提供统一的访问接口
    // 2. 使得数据结构的成员能够按照某种次序排列
    // 3. 主要为 for of 新的循环使用

   // 遍历过程：
     // 1. 遍历一个指针，指向数据结构起始位置（本质是指针对象）
     // 2. 第一次调用指针对象的next方法，，可以将指针指向数据结构的第一个成员
     // 3. 第二次调用指针对象的next方法，指针指向第二个成员
     // 4. 不断调用next方法，直到指向数据结构的结束位置
     // 在每一次调用next方法，都会返回数据结构当前成员的对象（value： 当前值和done： 布尔表示是否遍历结束）
     let makeIterator = (arr) => {
        let index = 0;
        return {
            next: () => {
                return index < arr.length ?
                    {value: arr[index++], done: false}:
                    {value: undefined, done:true}
            }
        }
    }
    let it = makeIterator(['a', 'b']);
    console.log(it.next()) // { value: 'a', done: false }
    console.log(it.next()) // { value: 'b', done: false }
    console.log(it.next()) // { value: undefined, done: true }
    
/* 
  2. 一个数据只要有Symbol.iterator属性，就认为是可遍历的
   symbol.iterator属性是一个函数，返回一个遍历器

   原生具备iterator接口数据结构
      array
      map
      set
      string
      typedArray
      函数的arguments
      nodelist对象
*/

/* 
  3. 使用iterator的场合
*/
  // 1. 解构赋值, 在解构时会调用Symbol.iterator方法
  // 2. 扩展运算符 也会调用默认的 Iterator 接口。
  // 3. yield* 后面跟的是一个可遍历解构，也会调用iterator接口
  // 4. 数组的遍历会调用遍历器接口，所以任何数组做为参数的场合，都可以调用
  
  let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
    length: 3,
  // 如果对象没有Symbol.iterator 不能遍历
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}

//如果对象属性名不是 0，1 2，遍历出来也是 undefined
let iterable2 = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable2) {
  console.log(item); // undefined, undefined, undefined
}