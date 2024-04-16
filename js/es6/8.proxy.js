/* 
 1. proxy 可以理解为在目标对象之前设置一层拦截， 外界对该对象的访问，都必须通过这层拦截用于修改某些操作的默认行为
           重载了代理的函数
    let proxy = new Proxy(target, handler{}) 拦截的目标对象和 拦截行为的对象
*/

// proxy支持的拦截操作
   // 1. get(target, proxyKey, receiver) 拦截对象属性的读取
   // 2. set(target, propKey, value, receiver) 拦截对象属性的设置
   // 3. has（target，propKey）返回布尔值,
   // 4. deleteProperty(target, propKey) 删除， 返回布尔值
   // 5. ownKeys(target) 返回一个数组，包含目标对象所有的自身属性
   // 6. getOwnPropertyDescriptor(target, propKey), 返回属性的描述属性
   // 7. defineProperty(target, propKey, propDesc) 返回一个布尔值
   // 8. getPrototypeOf(target) 返回一个对象
   // 9. setPrototypeOf(target, proto) 返回一个布尔值
   // 10. apply(target, object, args) 拦截proxy实例做为函数调用的操作
   // 11. construct（target， args）拦截实例作为构造函数操作
   // 12. preventExtensions(target) f返回布尔值
   // 13. isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

// 1. set(目标对象， 属性名， 操作行为针对对象（可选）), 可以继承
   const person = {
        name: '张三'
    }
    const proxy = new Proxy(person, {
        get: (target, proxyKey) => {
            if (proxyKey in target) {
                return target[proxyKey]
            } else {
                throw new ReferenceError('属性不存在')
            }
        }
    })
    console.log(proxy.name) // 张三
    console.log(proxy.age) // ReferenceError: 属性不存在
    
    let obj = Object.create(proto); // set属性可以继承
console.log(obj.name) // 张三
    
// 2. set(目标对象， 属性名，属性值，proxy实例本身（可选）)

    const person1 = {
        name: '张三',
    }

    const proxy1 = new Proxy(person1, {
        set: (obj, prop, value) => {
            if (prop === 'age') {
                if (!Number.isInteger(value)) {
                    throw new Error('年龄必须是数字')
                }
            }
            obj[prop] = value;
            return true
        }
    })
    proxy1.age = 100
    console.log(proxy1.age) // 100
    proxy1.age = 'aaa' // 报错
    
    // 如果目标对象不可写 set方法失效
    Object.defineProperty(person1, 'age', {
        value: 123,
        writable: false
    })
    console.log(proxy.age) // 123
    proxy.age = 2000
    console.log(proxy.age) // 123 set失效
    
   // 严格模式下 set应该返回 fasle或者不返回都会报错

/* 
   3. apply(目标对象，ctx目标对象的上下文对象（this）， 目标对象的参数数组) 拦截函数的调用
*/
    const target = () => {  
        return 'i an target'
    }
    const handler = {
        apply: () => {
            return 'I am the proxy';
        }
    }
    const p = new Proxy(target, handler)
    console.log(p()) // I am the proxy
    // 调用p方法时，会被拦截，


    var twice = {
        apply() {
        return Reflect.apply(...arguments) * 2;
    }
    };
    function sum (left, right) {
    return left + right;
    };
    var proxy = new Proxy(sum, twice);
    console.log(proxy(1, 2)) // 6
    
/* 
  4. has(目标参数，查询属性值)
*/
    const handler = {
        has: (target, key) => {
            // 一般下划线是表示内部变量，外部不应该访问
            if (key[0] === '_') {
                return false
            }
            return key in target
        }
    }
    const proxy = new Proxy({'_age': 18, 'age': 19}, handler)
    console.log('age' in proxy) // true
    console.log('_age' in proxy) // false
    //当对象禁止扩展，使用has拦截会报错
    // Object.preventExtensions(obj);

/* 
  5. construct(目标对象， 构造函数的参数数组， new新建的构造函数)
     必须返回一个对象 否则报错
    由于construct拦截的是构造函数，所以Proxy目标函数必须是函数
    construct内 this指向的是 Proxy里面的 handler
*/

    const handler = {
        construct: function(target, args) {
            console.log(this === handler); // true
            console.log(args)
            return { age: args[0] * 10 };
        }
    }
    let p = new Proxy(function () {return 10 }, handler);
    console.log((new p(1)).age) // 10
    
/* 
 6. deleteProperty（）拦截delete方法，如果返回错误或 false则删除失败
*/
    const handler = {
        deleteProperty(treget, key) {
            // 做一些拦截操作
            return true
        }
    }

/* 
  7. defineProperty（）根据返回布尔值决定是否定义成功
     如果目标不可以扩展， 则不能增加目标不存在的属性，否则报错
     如果目标属性不可写，也不能改变
*/

/* 
  8. getOwnPropertyDescriptor(target, key) 返回某个属性描述或 undefined 
*/

/* 
 9. getPrototypeOf(target) 返回目标对象原型
*/

/* 
  10. ownKeys() 返回对象自身属性的读取操作
*/

/* 
  11. preventExtensions() 返回对象自身属性的读取操作
*/
/* 
  12. setPrototypeOf(target, proto) 改变target原型对象
*/
/* 
  13.isExtensible(target) 返回布尔值，决定目标是否可扩展
*/

/* 
  14. Proxy.revocable() 返回一个可取消的proxy实例
    let {proxy, revoke} = Proxy.revocable(target, handler);
    revoke()就取消了代理
*/

