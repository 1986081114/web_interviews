/* 
  1. 新的数据结构set， 类似于数组，但是成员的值是唯一的，没有重复的值
   
*/

const set = new Set([1, 2, 3, 4, 4])
console.log([...set]) // 1, 2, 3, 4

// 数组或字符串去重
console.log([...new Set('abccbd')].join('')) /// abc
//  [...new Set(array)] 数组去重

// 像set添加值set.add(), 不会做类型转换，所以 5和 '5' 是不同的， 但是NaN是相同的。添加两次会被去重 
    // set.add({})
    // set.add({}) //Set(2) { {}, {} }
    // 添加两个空对象，不会被去重，应为两个空对象不相等，其他的复杂类型如数组也不想等

// set实例方法
   //set.add(value)  添加一个值，返回set本身
   //set.delete(value) 删除某个值，返回布尔值，表示是否删除成功
   //set.has(value) 返回一个布尔值，表示该值是否是set的成员
   //ser.clear() 清楚所有的成员
// set遍历
    // Set.prototype.keys()：返回键名的遍历器
    // Set.prototype.values()：返回键值的遍历器 , set没有键名，所以 keys和values一样
    // Set.prototype.entries()：返回键值对的遍历器 同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。
    // Set.prototype.forEach()：使用回调函数遍历每个成员

/* 
  2. weakSet 与set类似，但是weakset的成员只能是对象和 symbol值，不能是其他的
      weakset都是弱引用，即垃圾回收机制不考虑wekset成员的引用，也就是说，如果其他对象不再引用该对象那么垃圾回收机制
      自动回收该对象所占用的内存,
    适合临时存放一组对象，以及存放和对象绑定的信息，只要这些对象在外部消失，他在weakset的引用就自动消失
    不可遍历
*/

/* 
   3. Map 类似于对象，，也是键值对的集合，但是键名不限于字符串，任何类型的值都可以当做键名，
      对象提供了 字符串-值的集合
      map提供了  值-值的集合，是一种完善的hash结构，

*/
    // const m = new Map();
    // const o = {p: 'Hello World'};

    // m.set(o, 'content')
    // m.get(o) // "content"

    // m.has(o) // true
    // m.delete(o) // true
    // m.has(o) // false

/* 
   4. weakMp WeakMap结构与Map结构类似，也是用于生成键值对的集合。
      WeakMap只接受对象（null除外）和 Symbol 值作为键名，不接受其他类型的值作为键名。
      WeakMap的键名所指向的对象，不计入垃圾回收机制。一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
*/