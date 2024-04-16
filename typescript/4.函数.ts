1.
//ts可以创建有名字的函数和匿名函数 ,函数类型只能是参数类型和返回值类型，函数具有推断类型的能力
function add(x: number, y: number): number {
    return x + y;
}

//变量被赋值为函数两种写法
let myAdd = function (x: number, y: number): number { return x + y; };
 // 箭头形式， 为变量hello指定类型，参数类型写在箭头左边，返回值类型写在箭头右侧
const hello: (txt: string) => void
      = function (txt: string) { };



//2.可选参数和默认参数
/* 
ts内的每个函数参数都是必须的， 当然可以传null和undefined， 编译器检查用户是否为每一个参数都传入了值
简短地说： 传递给一个函数的参数个数必须与函数期望的参数个数相同
*/

function buildName(firstName: string, LastName: string) {
    return firstName + " " + LastName
}
//let res1 = buildName("bob");//错误
let res2 = buildName("bob", "mary")
//let res3 = buildName("bob", "bob", "bob")//错误

//js里面参数是可选的，可传可不传，不穿默认是undefined 在ts里可以用？实现可选参数功能，
function buildName(firstName: string, LastName?: string) {
    return firstName + " " + LastName
}
let res1 = buildName("bob");//错误
let res2 = buildName("bob", "mary")
//let res3 = buildName("bob", "bob", "bob")//还是多错误


/* 
可选参数与末尾的默认参数共享参数类型
*/
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // 错误
let result4 = buildName("Bob", "Adams");         // 正确, Bob Adams

/* 
与普通参数不同的是， 默认值的参数如果在 必须参数前面， 那么用户必须明确传入undefined的值获取默认值
*/
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

/* 
  可选参数和 默认参数不能同时使用
*/
// 报错
function f(x?: number = 0) {
  // ...
}


//3.剩余参数
/* 
    在js里不知道有多少参数传进来， 可以用argument来访问所有的参数
    在ts里，可以把所有的参数收集到一个变量里,
    剩余参数会被当成个数不限的参数，可以一个没有，也可以有任意个, 
    剩余参数可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。
*/
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");


/*  function buildName(firstName: string, ...restOfName: string[], ...restofNum: number[]) {
   return firstName + " " + restOfName.join(" ") + restofNum;
   是错误的，只能有一个剩余参数
} */

//4.重载： 根据传入值的不同返回不同的数据
   // TypeScript 对于“函数重载”的类型声明方法是，逐一定义每一种情况的类型。
// 重载声明的排序很重要，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，
 // 所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。
        function f(x:any):number;
        function f(x:string): 0|1;
        function f(x:any):any {
        // ...
        }

        const a:0|1 = f('hi'); // 报错

// 5. 函数套用另一个函数类型 typeof
 
  function add(
    x:number,
    y:number
    ) {
    return x + y;
    }

    const myAdd:typeof add = function (x, y) {
    return x + y;
}
// 函数myAdd()的类型与函数add()是一样的，那么就可以定义成typeof add。因为函数名add本身不是类型，而是一个值，所以要用typeof运算符返回它的类型。

// 6. 参数解构
  function f(
    [x, y]: [number, number]
    ) {
    // ...
}

    function sum(
        { a, b, c }: {
            a: number;
            b: number;
            c: number
        }
        ) {
        console.log(a + b + c);
}

// 7. readonly 只读参数 #
// 如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上readonly关键字

 function arraySum(
    arr:readonly number[]
    ) {
    // ...
    arr[0] = 0; // 报错
}