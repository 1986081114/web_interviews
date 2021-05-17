/* 
ts内没有明确指出类型的地方， 类型推断会帮助提供类型
*/
//1.单类型推断
let str = "hello"
str = true//error Type 'boolean' is not assignable to type 'string'.
/* 
可以看到，变量str并没有指定它的类型， 而是直接赋值给哟个字符串， 当再给他赋值true就会报错， 这里ts根据我们赋值给str的值的类型，推断出str的类型是字符串类型
最基本的推断类型， 根据右侧的值推断左侧变量的类型
*/

//2.多类型联合
const arr = [1, 'a']
arr.push(false) // error，类型“false”的参数不能赋给类型“string | number”的参数
/* 
当定义一个数组或者元组包含多种元素的时候，元素可能有不同的类型， 这时候ts会将多个类型合并起来，组成一个联合类型。
此时arr元素被推断为string|number，也就是元素可以使string或number，除此之外的类型是不可以的

*/

//3.上下文类型：

/* 
前面有根据=符号右边的类型推断出左侧的类型， 现在还有根据左侧的类型推断右侧的类型，就是上下文类型。

*/
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);  // error，mouseEvent 上不存在属性 button
};
/* 
，TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。 因此，
就能推断出 mouseEvent参数的类型了。 如果函数表达式不是在上下文类型的位置， mouseEvent参数的类型需要指定为any，
这样也不会报错了。
 
*/
window.onmousedown = function (mouseEvent: any) {
    console.log(mouseEvent.button);  //<- Now, no error is given
};
/*
 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。
  上下文类型也会做为最佳通用类型的候选类型
  function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}
这个例子里，最佳通用类型有4个候选者：Animal，Rhino，Elephant和Snake。 当然， Animal会被做为最佳通用类型。
*/
