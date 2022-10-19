/* 
            和原数据是否指向同一对象，   第一层数据为基本数据类型，          原数据包含子对象

  赋值            是                    改变会使原数据一同改变            改变会使原数据一同改变
  浅拷贝          否                    改变不会使原数据一同改变          改变会使原数据一同改变
  深拷贝          否                    改变不会使原数据一同改变          改变不会使原数据一同改变

  当我们把一个对象赋值给一个新的变量时，赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，
  无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。

浅拷贝：重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。

深拷贝：从堆内存中开辟一个新的区域存放新对象，对对象中的子对象进行递归拷贝,拷贝前后的两个对象互不影响。


 
*/
/* 
 浅拷贝实现，
    浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，
    如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
   1.Object.assign({},obj)
   ：Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组

   2.loadsh.clone()
    var _ = require('lodash');
    _.clone()

   concat浅拷贝数组
   slice()
   
*/

const shallowClone = (target) => {
    if (typeof target === 'object' && target !== null) {
      const cloneTarget = Array.isArray(target) ? []: {};
      for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = target[prop];
        }
      }
      return cloneTarget;
    } else {
      return target;
    }
  }

  
let test = {
    a:5,
    b:{
        c:6
    }
}

let test1 = Object.assign({},test);
test1.a = 9
console.log(test);

let test2 = {...test}
test2.a = 56
 console.log(test);

//数组额类型
 let arr = [1, 3, {
    username: 'kobe'
    }];
 let arr3 = arr.concat()
 arr3[0] = 99
 console.log(arr)

 let arr4 = arr.slice()
 arr4[0] = 100
 console.log(arr)


/* 
深拷贝： 
     深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。
     JSON.parse(JSON.stringfy()),不能处理正则和和函数
      会忽略undefined, symbol，不能处理函数， 不能循环引用对象,无法解决循环引用的问题
      当然如果你的数据中含有以上三种情况下，可以使用 lodash cloneDeep的深拷贝函数。
      如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel
*/


//实现深度克隆--

  
let arr = [1, 3, {
    username: ' kobe'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)

  


function deepClone(obj, hash = new WeakMap()) {
    if(obj === null || typeof obj !== 'object') return obj
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)

    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
      // 这波操作相当关键，可以保证对象的原型不丢失！
    let cloneObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
    return cloneObj;
  }
  

let a = {
    num: 0,

    str: "",

    boolean: true,

    unf: undefined,

    nul: null,

    obj: { name: "我是一个对象", id: 1 },

    arr: [0, 1, 2],

    func: function () {
        console.log("我是一个函数");
    },
    func2: () =>{console.log(23)},

    date: new Date(0),

    reg: new RegExp("/我是一个正则/ig"),

    [Symbol("1")]: 1,
};

var b = deepClone(a)
console.log(b)


