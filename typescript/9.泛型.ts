/* 
generics
在定义函数或者类的时候遇到类型不明确的时候就可以使用泛型, 约束
 泛型可以理解成一段类型逻辑，需要类型参数来表达。有了类型参数以后，可以在输入类型与输出类型之间，建立一一对应关系。

  不适用any的原因时： any会跳过类型检查， 相当于用ts没有意义了
                    用T可以确认，函数参数类型和返回类型是相同的，any不能保证
*/
/* //T代表任意类型， 只有当函数使用的时候才能知道
添加类型变量T，T帮助我们捕获用户传入的类型， 之后我们就可以使用这个类型， 并使用T当返回值类型， 参数类型与返回值类型相同。

*/

function fn<T>(a: T): T {
    return a
}
let res1 = fn(10)//不指定泛型， ts可以自动对类型进行推断
let res2 = fn<string>("hello")


function fn2<T, C>(a: T, b: C): T {
    console.log(b)
    return a
}
let res3 = fn2<number, string>(22, "hello")


//2.泛型接口：
interface Identities<V, M> {
    value: V,
    message: M
}

let kp1: Identities<string, number> = { value: "str", message: 2 };

//使用泛型作为函数的返回类型
function identity<T, U>(value: T, message: U): Identities<T, U> {
    let identities: Identities<T, U> = {
        value,
        message
    };
    return identities
}
console.log(identity<number, string>(58, "hello"))

//3.泛型 类  使用<>将泛型类型包裹，跟在类后面
/* 
类有两部分： 静态部分和实例部分， 泛型类型指的是实力部分的类型，所以类的静态属性不能使用泛型类型
*/

class myClass<T> {
    value: T;
    add: (x: T, y: T) => T;
}

let numberClass = new myClass<number>();
numberClass.value = 2;
numberClass.add = function (x, y) { return x + y }

let stringClass = new myClass<string>()
stringClass.value = "hello";
// stringClass.value = 2  不能是数字了 


//4.泛型约束 extends
/* 
让传入值满足特定的条件
  class A<T> {
    value: T;
  }

  class B extends A<any> {
  }
  // 类A有一个类型参数T，使用时必须给出T的类型， 所以在b继承时，要写


有时候想要调用类型变量的一些属性方法，这时候除非显示的将特定属性定义为类型变量，否则编译器不知道它的存在
function identity<T>(arg: T): T {
    console.log(arg.length); // Error number没有length
    return arg;
  }

*/
  interface Length {
    length: number;
  }
  
  function identity2<T extends Length>(arg: T): T {
    console.log(arg.length); // 可以获取length属性
    return arg;
  }
  identity2('str')
  identity2({length: 10})
  identity2(2) // 2没有length属性，所以报错
  /* 
  编译器不知道T是否有length属性， 需要做的事让类型变量extends一个含有我们所需属性的接口， 
  T extends Length就是约束条件 用于告诉编译器，标识T必须满足 lenght， 否则就会报错
  
  */
  
  