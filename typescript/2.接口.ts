/* 1. ts的核心原则就是对值所具有的结构进行类型检查， 在ts内接口的作用就是就是为这些类型命名和为你的代码或第三方代码定义约定
  接口就好比一个名字， 描述要使用的要求， 定义变量的模板
接口中的所有属性都不能有实际得值，不考虑实际的值
在接口中所有的方法都是抽象方法

*/
/* 
   type 可以通过交叉类型 进行复用
   interface可以通过继承复用， 他们俩互相也可以复用
*/

/* 
  function inferfun(labelObj: {label: string, id: number, sure: boolean}) {
      console.log(labelObj.label)
      console.log(labelObj.id)
      console.log(labelObj.sure)
  }
  let myObj = {id: 10, label: "infer", sure: true, age: 20}
  inferfun(myObj) //可以输出 infer 10 true */

/* 
如果有其他函数也需要这样的验证规则呢？ 在函数内再写一边就会冗余，所以可以提取出来做成接口
*/

/* interface labeledValue {
  label: string;
  id: number;
  sure: boolean；

}
function inferfun(labelObj: labeledValue) {
  console.log(labelObj.label)
  console.log(labelObj.id)
  console.log(labelObj.sure)
}
let myObj = { id: 10, label: "infer", sure: true, age: 20 }
inferfun(myObj) ////可以输出 infer 10 true */
/*
 同时就算有其余想用这套规则的函数也可以直接用 function（obj: labeledValue），减少代码量：
 同时接口只要求这个对象参数中包含 label 且类型为string， id且类型为number，sure且类型为boolean，哦比较、缺一个就会报错
  但是如果obj有其余参数属性，编译器是不会管的，只会管那些必须的属性
*/

//2.可选属性：接内的属性不全是必须的，有些之在某系条件下存在，就要使用可选属性
interface labeledValue {
  label: string;
  id: number;
  sure?: boolean;
},
function inferfun1(labelObj: labeledValue) {
  console.log(labelObj.label)
  console.log(labelObj.id)
  console.log(labelObj.sure)
}
let myObj = { label: "infer", id: 10, age: 20 }
inferfun1(myObj)
/* 
这里myObj不包括sure但是没有报错，因为是可选属性
  可以对可能存在的类型进行预定义
  捕获引用了不存在属性时的错误
*/

//3.只读属性 readonly
interface Point {
  readonly x: number;
  y: number
}

let p1: Point = { x: 10, y: 20 }
p1.x = 30 //就会报错，
/* 
 还有readonlyArray<T>类型， 吧所有可变的方法去掉，保证确保创建数组后不会再被修改
*/
let a: number[] = [1, 2, 3]
let ro: ReadonlyArray<number> = a
ro[0] = 12//error
a = ro//error
a = ro as number[]//断言可以
let c = ro // zhengque

//3.const 和readonly
/* 
 最简单的判断用readonly和const的方法是看要把它当作变量还是作为一个属性， 作为变量就是用const， 属性就是用readonly
*/

//4.额外属性检查：
/* interface labeledValue {
    label: string;
    id: number;

}
function inferfun(labelObj: labeledValue) {
    console.log(labelObj.label)
    console.log(labelObj.id)
    return labelObj.label
}
let myObj = { id: 10, label: "infer", age: 20 }
let res = inferfun(myObj)//就不会报错，因为ts不会额外检查属性
let res = inferfun({ id: 10, label: "infer", age: 20 })//就会报错.说a'ge在接口未存在
console.log(res) */



interface labeledValue {
  label: string;
  id: number;
  //额外属性检查， key在这里设置是string类型， value可以使任意的
  [propName: string]: any;

}
function inferfun(labelObj: labeledValue) {
  console.log(labelObj.label)
  console.log(labelObj.id)
  return labelObj.label
}
let res = inferfun({ id: 10, label: "infer", age: 20 })
console.log(res)

//5.函数类型：
interface IFunc {
  sum: (x: number, y: number) => number;
}
/* interface ISum {
    (x: number, y: number): number;
} */

// 实现具体的函数
//  let add: Add = (a, b) => a + b;

//6.索引类型：  索引会约束该类型中所有名字为规定类型的属性。
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

/* 
我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值。
TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的
子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）
去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
*/
//确保了确保所有属性与其返回值类型相匹配。
iinterface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
  // 数值索引必须服从字符串的索引类型
  interface A {
    [prop: string]: number;
    [prop: number]: string; // 报错
  }

  interface B {
    [prop: string]: number;
    [prop: number]: number; // 正确
  }

// 7.继承接口
interface IAb {
  a: string;
}

interface IBc extends IAb {
  b: string;
  c: string;
}
  // 子接口与父接口有同名属性，子接口覆盖，但是重名属性 必须类型兼容，否则报错
  // 如果继承多哥父接口，父接口中同名属性也不能有类型冲突，否则报错
   interface Foo {
    id: string;
  }

  interface Bar extends Foo {
    id: number; // 报错, 类型不同
  }

//8.类类型
/* 
实现一个类实现接口
*/

interface labeledValue {
  label: string;
  id: number;
  say(): void

}

class classInf implements labeledValue {

  label: "interance"
  id: 18;
  say() {
    console.log("类使用implement接口")
  }
}

// 9. 接口合并
  // web内经常对window添加自定义属性， 但是 ts会报错，因为原始类型没有这些属性，解决方法就是自定义属性写成interface，合并原始定义

  interface Document {
    foo: string;
  }

  document.foo = 'hello';
  
  // 接口合并时，如果有同名类型声明，不能有冲突

// 10. interface 和 type
  // interface命令与type命令作用类似，都可以表示对象类型。两者往往可以换用，
  /**
   * 区别： (1)type 可以表示飞对象类型，而interface只能标识对象类型（包含数组，函数等）
   *        (2)interface可以继承其他属性，type不支持继承
   *        (3) 同名interface会自动合并，而type会报错
   *        (4) interface不能包含属性映射，type可以
   *        (5) this关键字只能用于interface, type中不能使用
   *        (6) type可以扩展原始类型string， interface不行
   *        （7） interface无法表达某些复杂类型（比如交叉类型和联合类型），但是type可以。
   * 
   *   继承主要添加属性，tyep定义的对象类型想要添加属性需要使用 & 
              type Animal = {
                name: string
              }
              type Bear = Animal & {
                honey: boolean
              }  在bear上添加了一个属性honey
   * 
       而interface想要添加属性，可以采用继承的写法 extends, type和 interface 可以换用，interface可以继承type

       // 同名type会报错
       type A = { foo:number }; // 报错
      type A = { bar:number }; // 报错

      interface A { foo:number };
      interface A { bar:number };
      const obj:A = {
        foo: 1,
        bar: 1
      };
        这说明 interface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type。

   */
  /**
   * 
   * 
   */
 