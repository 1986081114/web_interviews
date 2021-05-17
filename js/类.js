/* 
要求设计 LazyMan 类，实现以下功能。 
LazyMan('Tony'); 
// Hi I am Tony 
LazyMan('Tony').sleep(10).eat('lunch'); 
// Hi I am Tony 
// 等待了 10 秒... 
// I am eating lunch
LazyMan('Tony').eat('lunch').sleep(10).eat('dinner'); 
// Hi I am Tony 
// I am eating lunch
// 等待了 10 秒... 
// I am eating diner
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(1 0).eat('junk food');
 // Hi I am Tony
 // 等待了 5 秒... 
 // I am eating lunch 
 // I am eating dinner 
 // 等待了 10 秒...
  // I am eating junk food
*/

function deepClone(obj, hash = new WeakMap()) {
    //避免循环应用，如果以前存在过直接返回结果
    if (hash.has(obj)) return obj;
    var target;
    if (obj === null) { return obj }
    hash.set(obj, obj);
    //只能判断基本的数据类型 typeof在判断null、array、object以及函数实例（new + 函数）时，得到的都是object
    let t = typeof obj
    switch (t) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'undefined':
            return obj;
    }

    if (Array.isArray(obj)) {
        target = [];
        obj.forEach((c, i) => { target.push(deepClone(obj[i])) })
    } else {
        target = {}
        Reflect.ownKeys(obj).forEach(key => {
            if (isObject(obj[key])) {
                target[key] = deepClone(obj[key], hash)
            } else {
                target[key] = obj[key]
            }
        })
    }
    return target
}
