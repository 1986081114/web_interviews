/* 
  1.Reflect对象和Proxy类似，也是es6为了操作对象而提供的新api
    (1)可以从reflect拿到语言内部的方法
    (2)修改某些object方法返回的结果，让其变得合理, 比如，Object.defineProperty(obj, name, desc)在无法定义属性时，
       会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
    (3) 让object操作都变成函数行为 比如name in obj和delete obj[name]，而Reflect.has(obj, name)和
        Reflect.deleteProperty(obj, name)让它们变成了函数行为。
    (4) Reflect对象的方法和proxy对象的方法对应，这会让proxy方法可以方便的调用
        reflect上的方法，完成默认行为，
*/

    // 老写法
    try {
        Object.defineProperty(target, property, attributes);
        // success
    } catch (e) {
    // failure
    }

    // 新写法
    if (Reflect.defineProperty(target, property, attributes)) {
    // success
    } else {
    // failure
    }
   
    // 上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。
    Proxy(target, {
        set: function(target, name, value, receiver) {
            var success = Reflect.set(target, name, value, receiver);
            if (success) {
            console.log('property ' + name + ' on ' + target + ' set to ' + value);
            }
            return success;
        }
    });

    /* 
      2. Reflect 一共有13个静态方法
    */
    Reflect.apply(target, thisArg, args)
    Reflect.construct(target, args)
    Reflect.get(target, name, receiver)
    Reflect.set(target, name, value, receiver)
    Reflect.defineProperty(target, name, desc)
    Reflect.deleteProperty(target, name)
    Reflect.has(target, name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)