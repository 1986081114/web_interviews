/* 
  1. 属性的简介表示, 变量直接写入 大括号内，属性名就是变量名, 属性值就是变量值
*/
    //   const foo = 'baz
    //   const baz = {foo}
    //   等同于
    //   const baz = {foo: foo}
/* 
   2. 属性名表达式 可以用字面量方式定义对象， es5只能使用标识符定义属性
*/
    let propKey = 'foo';

    let obj = {
        [propKey]: true,
        ['a' + 'bc']: 123  // 表达式形式，即把表达式挡在方括号内
    };

/* 
  3. 方法的name属性, 对象方法也是函数，因此也有name属性
*/
    const person = {
    sayName() {
        console.log('hello!');
    },
    };

    person.sayName.name   // sayName
    
/* 
  4.属性的可枚举型和遍历
    对象的每个属性都有一个描述对象（Descriptor） 用来控制该属性的行为
*/
    let obj41 = {
        'foo': 12,
        'fun': () => {return a}
    }
    console.log(Object.getOwnPropertyDescriptor(obj, 'foo' )) // 这个是 返回某个属性的没有s
    // // { 
    //     value: 12,
    //     writable: true,
    //     enumerable: true,  // 可枚举型
    //     configurable: true
    // }

    // 如果enumerable为false则不可枚举不可遍历：
    //     for...in循环， 只遍历对象自身的和继承的可枚举的属性
    //     Object.keys() 返回对象自身的所有可枚举的属性的键名(不包括继承)
    //     JSON.stringify(): 只串化对象自身的可枚举的属性(不包括继承)
    //     Object.assign(): 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性(不包括继承)

    // 引入enumerable属性最初的目的就是让某些属性可以避免for in 的操作，不然所有的内部方法和属性都被遍历到。


/* 
  5. 遍历对象的属性
*/
  //5.1 for..in 循环遍历对象自身的和继承的可枚举属性（不含symbol属性）
  // 5.2 Object.keys() 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含symbol属性）的键名
  // 5.3 Object.getOwnPropertNames 返回一个数组， 包含对象自身的所有属性（不包含symbol， 但包含不可枚举的）的键名
  // 5.4 Object.getOwnPropertySymbols()返回一个数组，包含对象自身的所有symbol属性的键名
  // Reflect.ownKeys() 返回一个数组，包含对象自身（不包含继承的）所有键名， 无论键名是否是symbol是否可枚举

  // 上述五种遍历都遵循属性遍历的次序规则
        // 首先遍历所有的数字键，按照数值升序
        // 其次按照所有的字符串，按照加入时间升序
        // 最后遍历所有的symbol按照加入时间升序
        Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
        // ['2', '10', 'b', 'a', Symbol()]

/*  
 6. super关键字 
   this总是指向函数所在的当前对象， 
   super指向当前对象的原型对象, 只能在对象的方法中使用，其他地方会报错
*/
    const proto = {
        'foo': 'hello'
    }

    const obj61 = {
        'foo': 'world',
        find() {
            return super.foo;
        }
    };
    Object.setPrototypeOf(obj61, proto)
    console.log(obj.find()) //  hello 指向原型的值
    
    // 报错
    // const obj = {
    // foo: () => super.foo
    // }

    // // 报错
    // const obj = {
    //  foo: function () {
    //      return super.foo
    //  }
    // }  // 因为super只能在方法中调用 而上述是在函数内，只是将函数赋值给foo属性

/* 
    7. 解构赋值 (浅拷贝) 用于将目标对象自身的所有可遍历但尚未被读取的属性分配到指定的对象上。
*/
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }; // 浅拷贝
    //  解构赋值需要右侧是一个对象，如果是null或者 undefined报错，因为无法转成对象,且解构赋值必须在最后

// 新增方法 -----------

/* 
  1. Object.is() 比较两个值是否相等
*/
    //  es5比较值一般是用 == 和 ===， 前者自动转换数据类型， 后者NaN不等于自身， 以及 +0 等于 -0，
    // es6 提出同值相等 is方法判断两个值是否严格相等 较运算符（===）的行为基本一致。不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

/* 
  2. Object.assign(target, source1, source2...) 合并对象 将源对象可枚举属性复制到目标对象
     浅拷贝(部分深拷贝，)
     var test = {  name: '张三' }
    var data = { 
                a: 123,
                b: test
                }
    var newData = Object.assign({},data)
    console.log(newData) 
    // {  a: 123,  b: {    name: '张三'  }}
    test.age = 18
    console.log(newData)
    // {  a: 123,  b: {    name: '张三',   age: 18  }}
    这种方式的拷贝，如果源目标对象中某个属性值是对另一个对象的引用，那么这个属性的拷贝仍然是对引用的拷贝。 

*/
   // 如果有多个同名属性， 则后面的属性覆盖前面的
        console.log(Object.assign([1, 2, 3], [4, 5])) // [4 ,5, 3]
        // assign会将数组转成属性名为 0 ，1， 2的对象， 因此属性名为 0， 1的会被覆盖
   // 只有一个对象 直接返回原对象
       const obj = { a: 1 }
       console.log(Object.assign(obj) === obj)
    // 如果是非对象类型 会转成对象在返回， undeifned 和 null 无法转成对象，所以会报错
        typeof Object.assign(2) // "object"
        Object.assign(undefined) // 报错
        Object.assign(null) // 报错
    // 如果非对象参数不在首位， 则规则不同,首先转成对象， 如果不能转成，则跳过
    // 其他类型的值（即数值、字符串和布尔值）不在首参数，不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值会被忽略 因为没有产生可枚举的实义属性。
        let obj = {a: 1};
        Object.assign(obj, undefined) === obj // true
        Object.assign(obj, null) === obj // true {a: 1}
        Object.assign(obj, true) === obj // true {a: 1}
        Object.assign(obj, 123) === obj // true {a: 1}
        
        console.log(Object.assign(obj, 'abc')) // { '0': 'a', '1': 'b', '2': 'c', a: 1 }
        
    // 取值函数处理， 会将函数取值在合并
        const source = {
            get foo() { return 1 }
        };
        const target = {};

        Object.assign(target, source) // {foo: 1}
    
    // 用途
       // 1. 为对象添加属性, 或指定默认值
            class Point {
                constructor(x, y) {
                    Object.assign(this, {x, y});
                }
            }
           // 指定默认值
            const DEFAULTS = {
                logLevel: 0,
                outputFormat: 'html'
            };
            options = Object.assign({}, DEFAULTS, options);
           
        // 2. 为对象添加方法
            Object.assign(SomeClass.prototype, {
                someMethod(arg1, arg2) {
                    ···
                },
                anotherMethod() {
                    ···
                }
            });
        // 3. 克隆对象
                Object.assign({}, origin)
        // 4. 合并多个对象
    
    /* 
       3. Object.getOwnPropertyDescriptors()
          返回指定对象所有自身属性（非继承属性）的描述对象
          该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
    */
        const obj = {
            foo: 123,
            get bar() { return 'abc' }
        };

        Object.getOwnPropertyDescriptors(obj)
        // { foo:
        //    { value: 123,
        //      writable: true,
        //      enumerable: true,
        //      configurable: true },
        //   bar:
        //    { get: [Function: get bar],
        //      set: undefined,
        //      enumerable: true,
        //      configurable: true } }


    /*
       4. __proto__ 属性的 Object.setPrototypeOf(), Object.getPrototypeOf()
    */
        let proto = {};
        let obj = { x: 10 };
        Object.setPrototypeOf(obj, proto);

        proto.y = 20;
        proto.z = 40;

        obj.x // 10
        obj.y // 20
        obj.z // 40
        
      // 如果第一个参数不是对象, 会自动转成对象，但是由于返回的还是第一个参数，所以该操作不会产生任何效果
      // 但是由于 undefined和 null无法转成对象 ，所以会报错 
        Object.setPrototypeOf(1, {}) === 1 // true
        Object.setPrototypeOf('foo', {}) === 'foo' // true
        Object.setPrototypeOf(true, {}) === true // true
        Object.setPrototypeOf(undefined, {}) // 报错
        Object.setPrototypeOf(null, {}) // 报错
    
    // Object.getPrototypeOf(obj); 获取对象的原型方法

    /*
       5. Object.keys(), Object.values(), Object.ebtries() Object.fromEntries()
         返回一个数组。成员事对象自身的（不包含继承属性的）的所哟呀可遍历属性
         Object.fromEntries()是 Object.ebtries()的逆向操作，用于讲键值对的数据结构还原为对象
    */
   
    /* 
    6. Object.hasOwn(), 判断是否为自身的属性 两个参数，第一个是所要判断的对象，第二个是属性名。
    */