/* 

properties 特性
attributes  属性

属性attribute 是指对象的附加信息。
特性properties 描述了对象的特性。

当写html代码时，会定义attributes在元素上，然后当浏览器解析你的代码，就会创建相应的dom节点对象， 这个对象有他的properties
<input type="text" value="Name:">
有两个属性 type 和 value, 一但浏览器解析这个元素，  HTMLInputElement 元素对象会被创建,这个对象包含很多特性如：accept， align childNodes, children, classList, className等。
对于一个给定的 dom节点对象, 它的许多属性都与具有相同或相似名称的特性相关，但不是一对一的关系。例如，对于这个 HTML 元素：
<input id="the-input" type="text" value="Name:">

  id特性是 id属性的映射的特性，id属性是一个纯粹的反射属性， 并不会修改和限制值
  特性type是一个type属性映射的特性， type不是纯粹的反射属性， 它仅限已知值， 如<input type="foo">，那么theInput.getAttribute("type")给你"foo"而theInput.type给你"text"。
  特性value不是属性value的映射， 相反，他是输入的当前值， 当用户输入改变value时，特性value时时映射改变的值.
        theInput.value // returns "John"
        theInput.getAttribute('value') // returns "Name:"'
        特性value映射当前的输入值， 属性value来自于html源代码的属性的初始文本内容

*/


