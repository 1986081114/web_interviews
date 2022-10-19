1.
//ts可以创建有名字的函数和匿名函数 ,函数类型只能是参数类型和返回值类型，函数具有推断类型的能力
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function (x: number, y: number): number { return x + y; };

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
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
/* 
与普通参数不同的是， 但默认值的参数如果在必须参数前面， 那么用户必须明确传入undefined的值获取默认值

*/
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

//3.剩余参数
/* 
在js里不不知道有多少参数传进来， 可以用argument来访问所有的参数
在ts里，可以把所有的参数收集到一个变量里,
剩余参数会被党羽个数不限的参数，可以一个没有，也可以有任意个,
传进去的参数必须满足剩余参数数组的类型
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
