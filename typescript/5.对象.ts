import { json } from "stream/consumers";

const obj:{
  x: number;
  y: number;
  add(x:number, y:number): number;
  // 或者写成
  // add: (x:number, y:number) => number;
} = {
  x: 1,
  y: 1,
  add(x, y) {
    return x + y;
  }
};

// 2. 属性名索引类型

// 如果对象的属性非常多，一个个声明很麻烦，无法事先知道有多少属性，就可以使用属性名表达式写法
type MyObj = {
  [property: string]: string
};
 // 不管这个对象有多少个属性，只要属性名为字符串，属性值也为字符串就可以
const obj:MyObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
};
  // 属性名有三种格式
    type MyObj = {
    [property: string]: string
    };
    type T1 = {
    [property: number]: string
    };

    type T2 = {
    [property: symbol]: string
    };
   
    // 对象可以有多个属性名索引，但是索引不能和字符串索引发生冲突，必须服从后者，因为在js内部，所有索引名都会自动转成字符串属性名
    type MyType = {
        [x: number]: boolean; // 报错
        [x: string]: string;
    }
// ，类型MyType同时有两种属性名索引，但是数值索引与字符串索引冲突了，所以报错了。由于字符属性名的值类型是string，
//  数值属性名的值类型只有同样为string，才不会报错。

    type MyType = {
        foo: boolean; // 报错
        [x: string]: string;
    }
// 属性名foo符合属性名的字符串索引，但是两者的属性值类型不一样，所以报错了。

 // 属性名的数值索引不宜用来声明数组，因为采用这种方式声明数组，就不能使用各种数组方法以及length属性，因为类型里面没有定义这些东西。
     type MyArr = {
        [n:number]: number;
    };

    const arr:MyArr = [1, 2, 3];
    arr.length // 报错
    
// 3. 解构赋值用于直接从对象中提取属性。

    const {id, name, price}:{
        id: string;
        name: string;
        price: number
    } = product;

    // 目前没法为解构变量指定类型，因为对象解构里面的冒号，JavaScript 指定了其他用途。
    let { x: foo, y: bar } = obj;
    // 等同于
    let foo = obj.x;
    let bar = obj.y;
    
// 4. 结构类型原则
   // 只要对象 B 满足 对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structural typing）。
   type A = {
    x: number;
    };

    type B = {
    x: number;
    y: number;
    };
    const A: { x: number } = B; // 正确
  
// 5. 严格字面量检查  如果对象使用字面量表示，会触发 TypeScript 的严格字面量检查

    const point:{
    x:number;
    y:number;
    } = {
    x: 1,
    y: 1,
    z: 1 // 报错
    };


    const myPoint = {
    x: 1,
    y: 1,
    z: 1
    };

    const point:{
    x:number;
    y:number;
    } = myPoint; // 正确
    
// 6. 最小可选规则， 如果某个类型的所有属性都是可选的， 那么该类型的对象必须存在一个可选属性， 不能所有可选属性都不存在
        type Options = {
        a?:number;
        b?:number;
        c?:number;
        };

        const opts = { d: 123 };

        const obj:Options = opts; // 报错
        
// 7. 空对象 
 // 空对象没有自定义属性，所以自定义属性赋值会报错，空对象只能使用 继承的属性
    const obj = {}; // 相当于 const obj:{} = {}
    obj.prop = 123; // 报错
