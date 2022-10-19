/*
1.set weakSet 区别：
    se6提供新的数据结构， set类似于数组， 但是成员值是唯一的， 没有重复的值，
    weakset结构与set类似， 也是不重复值的结合。 但是weakset的成员只能是对象， weakset都是弱引用，即垃圾回收不考虑weakset对该对象的引用
map对象类似于对象，也是键值对的集合， 但是键的范围不限于字符串， 各种类型的值都可以当成键
webpakmap结构与map类似， 也是用于生成键值对的集合， 但是weakmap只接受对象作为键名（null除外）， 不接受其他的。
WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收，不能遍历


2.js修改具有!important的css属性
1、使用CSSText修改

 document.getElementsByClassName('am-picker')[0].style.cssText='color:#999999 !important';
复制代码
2、CSSText会把这个元素的原有样式全部清掉，所以如果要保留原有元素的样式需要累加样式。
 */