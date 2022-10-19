/* 
使用枚举我们可以定义一些带名字的常量， 使用枚举可以清楚的表达意图或创建一组有区别的用例， ts支持数字的和基于字符串的枚举
*/
//1.数字枚举 
enum Direction {
    Up = 1,
    Dowm,
    Right,
    Left
}
Direction.Dowm //2
//这种方式叫反向映射，即通过值来访问建
console.log(Direction[2])
//默认初始化下标时0， 此时定义从1开始，第二个就是2

//2.字符串枚举 只有有一个是字符串，其余的都要赋值， 字符串枚举没有反向映射
enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

console.log(Direction1["Left"])

//3.异构枚举 混合字符串和数字 不建议使用
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

//4.常量枚举表达式：
/* 
 
满足条件：
  1.一个枚举表达式字面量  
    enum Man {a = 1}
  2.一个对之前定义的常量枚举成员的引用
  enum Man{a = 1, b = 2*a}
  3.带括号的常量枚举表达式
   enum Man{a = 1, b = 2*(a+1)}
  4.一元运算符 + - ~ 之一用在常量美剧表达式
  enum Man{a = 1, b = ~a}
  5.常量枚举表达式作为二元运算发 +，-，*，%，/，<<, >> ,>>>,&,|,^的操作对象若常熟枚举表达式的求值为NAN或infinity，在编译出错
  enum Man{a = 1<<2}
*/

//5.枚举成员值为计算值 除开常量枚举，所有的枚举成员都被当成需要计算的值
enm Man{ a = 'abc'.length }

//6.const枚举 
/* 
通过const修饰符来强调当前枚举类型， const枚举只能修饰常量枚举表达式，而且在编译时删除
*/
const enum Man {
    A,
    B,
    C,
    D
}
let man = [Man.A, Man.B, Man.C, Man.D];
console.log(man); // [0, 1, 2, 3]

//7.外部枚举
/*
用来描述已经存在的枚举类型的形状
 declare enum Enum {
    A = 1,
    B,
    C = 2
}
外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。
对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
*/