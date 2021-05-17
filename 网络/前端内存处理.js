/* 
1.内存的生命周期
   内存分配： 声明变量， 函数，对象的时候，js自动分配
   内存使用：调用的时候，使用的时候，
   内存回收： 不使用自动释放
2.js垃圾回收机制
   1.引用计数算法
       引用计数算法定义“内存不再使用”的标准很简单，就是看一个对象是否有指向它的引用。如果没有其他对象指向它了，说明该对象已经不再需了。
        可能会循环引用
    2.标记清除算法
       不再使用的对象”定义为“无法达到的对象
        在运行时给所有存储在内存的变量加上标记
        从根部出发能触及的对象，吧标记清除，
        哪些有标记的被视为将要清楚的变量
    3.内存泄漏：
        不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。
        3.1全局变量
        3.2遗忘的计数器或定时器
        3.3闭包
        3.4dom的引用，DOM对象添加的属性是一个对象的引用，解决设置为null
          IE7采用了极端的解决方案：离开页面时回收所有DOM树上的元素，其它一概不管。

    4.避免内存泄漏：
       减少全局变量
       减少闭包
       dom操作后设置为null 
       使用完数据即使解除 （null）

*/
//实现siceof（）  传入object，得到object得到多少debyte
function sizeof(object) {
    //typeof 返回值有六种可能： "number," "string," "boolean," "object," "function," 和 "undefined."以及'symbol'
    const objectObj = typeof object;
    switch (objectObj) {
        case 'string': {
            return object.length * 2
        }
        case 'boolean': {
            return 4;
        }
        case 'number': {
            return 8;
        }
        case 'object': {
            if (Array.isArray(object)) {
                return object.map(sizeof).reduce((res, cur) => res + cur, 0)
            } else {
                return sizeofObject(object)
            }
        }
        default: {
            return 0;
        }
    }
};
const seen = new WeakSet()
//计算对象字节大小
function sizeofObject(object) {
    if (object === null) {
        return 0;
    }
    let bytes = 0;
    //对象的key也是占内存的
    const properties = Object.keys(object);
    for (let i = 0; i < properties.length; i++) {
        const key = properties[i];
        bytes += sizeof(key);
        if (typeof object[key] === 'object' && object[key] !== null) {
            if (seen.has(object[key])) {
                continue;
            }
            seen.add(object[key]);
        }
        bytes += sizeof(object[key])
    }
    return bytes;
}

const testDate = {
    a: 111,
    b: 'cccc',
    2222: false
}

console.log(sizeof(testDate))
