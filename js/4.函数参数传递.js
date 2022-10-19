
33/*
1.按值传递：
    var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1

当传递value到函数中，相当于拷贝了一份，value， 假设叫_value， 函数中修改的都是_value的值，并不会影响到原来的value
*/

/*
2.引用传递：
   拷贝很好理解： 但是当值是一个复杂的数据类型， 的时候， 拷贝就会产生性能上的问题。
    所以就还有另一种传递方式，叫做引用传递，就是传递对象的引用， 内部函数对参数的改变会影响到该对象的值，
     因为两者引用的是同一个对象
     var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2

*/

/*
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
3.共享传递：
   在传递对象的时候，传递的是对象的引用副本，
   所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。所以第二个和第三个例子其实都是按共享传递。

最后，你可以这样理解：
参数如果是基本类型是按值传递，如果是引用类型按共享传递。
但是因为拷贝副本也是一种值的拷贝，所以在高程中也直接认为是按值传递了。
所以，高程，谁叫你是红宝书嘞！
*/