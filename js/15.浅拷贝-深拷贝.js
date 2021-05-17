/* 
            和原数据是否指向同一对象，   第一层数据为基本数据类型，          原数据包含子对象

  赋值            是                    改变会使原数据一同改变            改变会使原数据一同改变
  浅拷贝          否                    改变不会使原数据一同改变          改变会使原数据一同改变
  深拷贝          否                    改变不会使原数据一同改变          改变不会使原数据一同改变
 
*/
/* 
 浅拷贝实现，
   Object.assign
   ：Array的slice和concat方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组
   如果该元素是个对象引用(不是实际的对象)，slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。
   如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。

对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。
在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
*/
/* 
深拷贝： 

     JSON.parse(JSON.stringfy())
      会忽略undefined, symbol，不能处理函数， 不能循环引用对象
      当然如果你的数据中含有以上三种情况下，可以使用 lodash 的深拷贝函数。
      如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel
*/


//实现深度克隆--对象数组
// 定义检测数据类型的功能函数
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}
// 实现深度克隆---对象/数组
function deepClone(obj, hash = new WeakMap()) {
    //避免循环应用，如果以前存在过直接返回结果
    if (hash.has(obj)) return obj;
    var target;
    if (obj === null) { return obj }
    hash.set(obj, obj);
    //只能判断基本的数据类型 typeof在判断null、array、object以及函数实例（new + 函数）时，得到的都是object
    let t = checkedType(obj)
    switch (t) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'undefined':
            return obj;
    }
    if (t === Date) return new Date(obj); // 日期对象直接返回一个新的日期对象
    if (t === RegExp) return new RegExp(obj); //正则对象直接返回一个新的正则对象
    //如果是函数
    if (t == 'Function') return obj.bind(null);


    if (Array.isArray(obj)) {
        target = [];
        obj.forEach((c, i) => { target.push(deepClone(obj[i])) })
    } else {
        target = {}
        //里使用了 Reflect.ownKeys() 获取所有的键值，同时包括 Symbol，对 source 遍历赋值即可
        Reflect.ownKeys(obj).forEach(key => {
            //这里没有用isObject是因为会报错
            if (checkedType(obj[key]) == 'Object') {
                target[key] = deepClone(obj[key], hash)
            } else {
                target[key] = obj[key]
            }
        })
    }
    return target
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

    date: new Date(0),

    reg: new RegExp("/我是一个正则/ig"),

    [Symbol("1")]: 1,
};
var b = deepClone(a)
console.log(b)



