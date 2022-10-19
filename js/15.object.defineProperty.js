/* 
object.defineProperty(obj, prop, descriptor) 
方法会直接在一个对象上定义一个新属性，或者修改对象的现有属性， 并且返回此对象
在es6中由于symbol类型的特殊性， 用symbol类型的值来做对象的key与常规的定义或者修改不同， 而object。defineProperty是定义key为symbol属性的方法之一

descript属性描述符：
    数据描述符和存取描述符
    数据描述符是一个具有值的属性，该值可以是可写的， 也可以是不可写的， 
    存取描述符是由getter函数和setter函数所描述的属性， 一个描述符只能是两者之一，不能同时是两者

    共享属性：
       configurable： 只有当该属性为true时， 该属性的描述符才能修改，可能被删除，默认是false
       enumberable：只有该属性为true时该属性才会出现在对象的枚举属性中默认是false

    数据描述符：
        value：该属性对应的值， 可以是任何有效的js值， 默认是undefined
        writable： 只有当该属性为true属性的值也就是上面的value才能被修改
    
    存取描述符：
         get： 属性getter函数，访问该属性会调用此函数， 执行时不用穿参数，但是回传this对象，默认是undefined
         set：属性stter的函数， 属性被修改了，会调用此函数，可以接受一个参数也就是被赋予的新值。


*/