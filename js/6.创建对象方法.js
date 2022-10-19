/* 
  对象： 属性的集合，属性就是一个名和一个值
     对象具有唯一的标识，即使两个完全相同的对象，也并非同一个对象
     对象具有状态，同一个对象具有不同的状态
     对象具有行为，即对象的状态会因为不同的行为产生变迁

     let folder = {
       size:2000,
       name: 'folder',
       'other objict': folder
     }
      
     //快速访问对象
     console.log(folder.size)
     //访问对象
     console.log(folder['other object'])

     //[]也可以插入变量
     let sizeKey = 'size'
     console.log(folder[sizeKey], folder['na' + 'me'])

     //删除某个属性
     delete folder.name

     一边来讲，对象的唯一标识都是内存地址，因为对象具有唯一标识的内存地址。
     在js中对象具有高度的动态性，因为在js赋予了使用者在运行时为对象添改状态和行为的能力

  对象的两个属性：数据属性和访问器属性（getter/setter）
    数据属性四个特征：
       value： 属性的值
       writable： 决定属性是否被赋值
       enumerable： 决定for in是否枚举该属性
       configurable： 决定该属性是否能被修改或者改变特征值
    访问器属性（getter/setter）
       getter： 函数或undefined，在取属性值时被调用
       setter： 函数或undefined， 在设置属性值时被调用
       enumerable： 决定 for in是否美剧该属性
       configurable： 决定该属性是否可以被删除或修改
    Object.getOwnPropertyDescriptor查看属性设置
    Object.defineProperty 来定义属性

    var o = { get a() { return 1 } };
    console.log(o.a); // 1


*/
/*
Object.create(proto, [propertiesObject])，是浅拷贝
创建一个新对象， 使用现有的对象提供新对象的__proto__，继承一个对象， 添加的属性是在原型上

 proto 必须， 表示新创建对象的原型对象， 即该参数会被赋值到目标函数的原型上，
 propertiesObject : 可选，默认为false， 添加到创建对象的可枚举属性
 o = Object.create({}, { p: { value: 42 } })

 // new Object() 方式创建
var a = {  rep : 'apple' }
var b = new Object(a)
console.log(b) // {rep: "apple"}
console.log(b.__proto__) // {}
console.log(b.rep) // {rep: "apple"}

// Object.create() 方式创建
var a = { rep: 'apple' }
var b = Object.create(a)
console.log(b)  // {}
console.log(b.__proto__) // {rep: "apple"}
console.log(b.rep) // {rep: "apple"}
*/

/* function create(proto, propertyObject = undefined) {
    function F() { };
    F.prototype = proto;
    F.prototype.constructor = F;
    let obj = new F();
    if (propertyObject != undefined) {
        //直接在一个对象上定义新的属性和修改现有的属性，并返回对象
        Object.defineProperties(obj, propertyObject)
    }
    return obj
} */

/*
object.create()和{}和new Object

 new和字面量创建的对象是Object实例，原型都指向object.prototype,继承内置对象object
 create（arg）创建的对象原型取决于arg，arg为null新对象是空对象。没有原型，不继承任何对象，
 arg不为null新对象原型指向指定对象，继承该对象

*/
/*
Object.create(null)的使用场景
  创建的对象没有任何属性，可以当作一个非常纯净的map使用， ，可以自己定义toString，不用担心覆盖
  在我们使用for…in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了，也可以使用Object.keys[]
  你需要一个非常干净且高度可定制的对象当作数据字典的时候；
想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

*/

/*

创建对象的方法：
     创建对象：
       对象字面量 let a = {},
       通过构造函数 let b = new Object();
       object.create（）
*/

//Object.create创建一个新对象，使用现有的对象来提供新创建的对象的__proto__，第二个可选参数为属性描述对象
function createObj(obj, propertiesObject = {}) {
  console.log(typeof obj)
  if (typeof obj !== 'object' && typeof obj !== 'function' && obj !== null) {
    throw ('Object prototype may only be an Object or null:' + obj)
  }
  function F() { }
  F.prototype = obj
  Object.defineProperties(F, propertiesObject)
  return new F()
}
var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin
//修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，
//而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。



/* 

对象的key类型只能是，string， 如果是number会自动转成string类型， es6以后添加了symbol类型
//通过.方式获取属性值，key是静态值，即{h:"value"}时，h是没有""，为静态值。
    var someOne = {
        name: "张三",
        age: "四岁"
    };
    console.log(someOne);
    // 通过[]获取属性值, key是动态的，可以是字符串，或者数字的形式(即Number类型)
    var string = {
        "String": "key为字符串"，
        "other": "其他字符串"
    };
    var number = {
        1: "key为数字类型",
        2: "key为数字类型"
    };
    console.log(string["String"]);
    console.log(number[1]);  // 注意这里的写法跟数组容易混淆，number仍是对象，不是数组
    // 获取对象所有key的方法
console.log(Object.keys(string));  // 输出[ 'key为字符串类型', '其他字符串类型' ]
如果key是变量，就必须使用[].
     
obj.a.b.c和 obj[a][b][c]那个性能更好
所以obj.a.b.c性能更好。因为如果是[],还要考虑是否为变量，

*/

