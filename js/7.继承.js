/* 
es6之前，js本质上不能算是一门面向对象的编程语言， 因为他对于封装，继承，多态这些面向对象语言的特点并没有在语言层面提供原生的支持
 但是引入了原型（prototype）的概念，可以让我们以另一种方式模拟类， 并通过原型链的方式实现父类子类之间共享属性的继承，
 面向对象并不是一种语言’
 而是一种设计思想，正是因为j本身对面型对象没有语言上的支持， 所以才出来五花八门的代码， 
 索性es6添加了 class，extends，static，等
 关键字用以在语言层面支持面向对象。

面型对象： 面向对象是一种编程思想， 与面向过程是对应的， 万物皆可对象， 面向对象的主要是把事务给对象话，包括属性和方法，
   易维护，易扩展，易复用， 
    由于对象有封装继承多态特征， 可以设计出低耦合的系统，使系统更利于维护
      **/

//继承
/* 
对于继承，Javascript对象是一个动态的"属性包"，Javascrit对象有一个指向原型对象的链接。当试图访问一个对象的属性时，
 这个属性不仅会在当前对象里查找，并且会在这个对象的原型对象上查找，以及原型对象的原型对象上查找，
 直到正确的属性被找到或者原型链到达终点。
*/
/* 1.原型链方式 
      这种方式是直接new了一个父类的实例，然后赋值给子类的原型， 这样也就相当于直接将父类原型中的方法属性以及挂载在this上的各种方法赋值给子类的原型。
      man使子类的实例，它会顺着原型链往上找， 
      缺点： 父类的所有引用属性（info）会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
            子类型实例不能给父类型构造函数传参     
*/
function Person(name) {
    this.name = name;
    this.info = {
        age: 20
    }
    this.sayName = function () {
        console.log(this.name)
    }
}
function Man() { }

Man.prototype = new Person();
var man = new Man('sss')
man.name = 'test'
man.sayName() //test
/* 

/*
 2.构造函数方法
   通过call，apply方法将父类构造函数的this绑定到子类上
   子类的构造函数用子类实例的this调用父类的构造函数，

   优点：避免了引用类型的属性被所有实例共享, j
         可以传值
   缺点： 只能继承，父类的构造函数声明的属性，不能继承父类构造函数原型的属性和方法，
          方法都在构造函数中定义，每次创建实例都会创建一遍方法。， 浪费内存*/

         function person1 (name){
            this.name = name
            this.info = {
                age: 20
            }
            this.sayName =  function() {
                console.log(this.name)
            }
        
        }
        
        function Man1() {
            person1.apply(this, arguments)
        }
        
        let man1 = new Man1('test')
        man1.sayName()
        man1.info.age = 56
        console.log(man1.info)//56
        
        let man2 = new Man1('test2')
        console.log(man2.info)//20

/*
混合继承
   综合原型继承和构造函数继承优点， 通过构造函数继承父类实例属性， 原型继承父类原型上的属性和方法
  缺点： person的构造函数会多执行一次只要new Man，Man.prototype = new person()
  
  */

  function person (name){
    console.log(100)
    this.name = name
    this.info = {
        age :20
    }
    this.sayName =  function() {
        console.log(this.name)
    }

}
person.prototype.getAge = function() {
    console.log(56)
}

function Man(name, age) {
    person.call(this, name)
    this.age = age
}

Man.prototype = new person()

let man = new Man('test', 20)
man.sayName()//test
man.getAge()//20
man.info.age = 56
console.log(man.info.age)//56

let man1 = new Man()
console.log(man1.info.age)//20

/* 
 4.组合继承的优化
   父类原型对象直接给到子类，父类构造函数只执行一次，而且父类属性和方法均能访问，但是我们来测试一下：
*/

//继承

function person (name){
    console.log(100)//new 
    this.name = name
    this.info = {
        age :20
    }
    this.sayName =  function() {
        console.log(this.name)
    }

}
person.prototype.getAge = function() {
    console.log(56)
}

function Man(name, age) {
    person.call(this, name)
    this.age = age
}

Man.prototype = person.prototype

let man = new Man('test', 20)
man.sayName()//test
man.getAge()//20
man.info.age = 56
console.log(man.info.age)//56

let man1 = new Man()
console.log(man1.info.age)//20
//但是子类实例的构造函数是person，显然这是不对的，应该是Man


/*
5.寄生组合继承


这里用到了Object.creat(obj)方法，该方法会对传入的obj对象进行浅拷贝。和上面组合继承的主要区别就是：将父类的原型复制给了子类原型。这种做法很清晰：

构造函数中继承父类属性／方法，并初始化父类。
子类原型和父类原型建立联系。
*/
function Person(name) {
    this.name = name; //1
    this.className = "person"
}
Person.prototype.getName = function () {
    console.log(this.name)
}
function Man(name) {
    Person.apply(this, arguments)
}
//注意此处
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man//否则指向Person
var man1 = new Man("Davin");



/*
es6继承
class类通过extends和super实现继承， 子类必须在constructor方法中代用super方法，否则新建实例将会报错，这是因为子类自己的this对象，
必须先通过父类的构造函数完成塑性，得到父类的属性和方法，然后对其加工，加上子类自己的属性和方法。如果不调用super方法，
子类将得不到this对象。如果没有定义constructor方法，这个方法会被默认的添加。

 es6只有静态方法，没有静态属性，this关键字在调用super之后才可用。

 缺点： 不支持静态属性，
        class不支持私有变量和函数， class中定义的所有函数，都或被放到原型，会被子类访问

 和es5区别
   ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
   ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
   然后再用子类的构造函数修改this。 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，
   不管有没有显式定义，任何一个子类都有constructor方法。
   */

 class Person{
  //static sCount=0 //1
  constructor(name){
     this.name=name;
     this.sCount++;
  }
  //实例方法 //2
  getName(){
   console.log(this.name)
  }
  static sTest(){
    console.log("static method test")
  }
}

class Man extends Person{
  constructor(name){
    super(name)//3
    this.sex="male"
  }
}
var man=new Man("Davin")
man.getName()
//man.sTest()
Man.sTest()//4
/* 输出结果：
Davin
static method test */


/*
多态：
    接口的多种不同的实现方式即为多态。
    class Person {
            constructor(name) {
                this.name = name
            }
            sayName(name) {
                console.log(name)
            }
        }
        class Worker extends Person {
            constructor(name) {
                super(name)
            }
        }
        var WorkerA = new Worker("张三")
        var WorkerB = new Worker("李四")
        WorkerA.sayName("张三")   //张三
        WorkerB.sayName("李四")   //李四

*/
/*
封装：

   封装的目的主要是信息隐藏，由于js没有private， public，protected等关键字提供权限访问，只能依赖作用域实现封装特性。
   var package = (function () {
  var inner = 'test'
  return {
    getInner: function () {
      return inner
    }
  }
})()
console.log(package.getInner()) // test
console.log(package.inner) // undefined
*/

/*
关键字：
    static：
    super：
    constructor：
    extends：
*/
/* 
static: 
   凡是被static修饰的方法，都是静态方法和属性（目前还没有）， 只能被类名调用， 不能被new实例化对象调用， 换句话说
   它只属于这个类，而不是属于对象的，  可以和非静态方法重名。
      1.不能通过实例化对象访问，只能类本身，其中this指向访问的类本身
      2.可以通过extends被子类继承
      3.可以通过super被子类使用，但也仅限于子类类本身，而不是实例化对象
*/

class A {
    // 静态属性
    static info = '见过你的美,还能爱上谁?';
    // 静态方法
    static love() {
        console.log('小姐姐,看见你就犯困,为情所困,为你所困!');
        console.log(this)

    }
    hate() {
        console.log('小姐姐,看见你就累');
    }

}
//let c = new A
//c.hate()//小姐姐,看见你就累
//c.love()//报错，love不是一个函数 

class B extends A {
    run() {
        console.log('类B的方法..');
    }
    //super在静态方法中，指向父类
    runLove() {
        return super.love()
    }
    static staRunLove() {
        return super.love()
    }
}
A.love()//小姐姐,看见你就犯困,为情所困,为你所困! this指向A
B.love()//小姐姐,看见你就犯困,为情所困,为你所困! this指向B
//B.hate()//报错 ，类不能调用
//A.hate()//报错

let b = new B;
//B.run()//报错
//b.run()//类B的方法..
//b.hate()//小姐姐,看见你就累
//b.love()//报错，
//b.runLove()//报错，实例化对象不能访问静态函数，属性
//b.staRunLove()//报错，实例化对象不能访问静态函数，属性
B.staRunLove()//可以正常访问 this指向B 
B.runLove()//报错，


/*
 extends： 继承
  es6新关键字，实现class的继承，用于创建一个类的子类

*/
/*
super 表示父类的构造函数，用来新建父类的this对象，子类的this必须通过父类的构造函数才能塑造，返回的是子类的实例
     得到与父类相同的实例属性和方法， 然后加上自己的方法与书香，如果不调用super，子类得不到this对象
  及可以当作函数使用，也可以当作对象使用。
      super（）当函数使用，代表父类的构造函数，es6中子类必须调用一次super和constructor ，可以不写会默认调用，且super只能用在子类的构造函数中。
      super当对象使用，在普通方法，指向父类的原型对象， 在静态方法中，指向父类。
       在子类普通方法，指向父类的原型方法，方法内部this指向当前的子类实例， 由于super指向父类原型对象，所以定义在父类上的方法或属性无法通过super调用

       在静态方法， 指向父类，方法内部的this指向当前的子类，而不是子类实例。
*/
/*
constructor：
是一种用于创建和初始化的class创建的对象的特殊方法，一个类只能有一个constructor，一个构造函数中可以使用super关键字来调用父类的构造方法
   默认返回值是类的实例对象（this）
*/
/*
class：
  是语法糖，让对象原型写法更加清晰，更像面向对象编程语法而已。
  创建一个基于原型继承的具有给定名称的新类
*/

/*
私有方法和私有属性还没有实现， 只能约定下划线打头方法是私有的， 或利用symbol值的唯一性生成。Reflect.ownKeys()依旧可以获取
目前可以在属性或者方法之前添加#代编私有
*/
/*
new.target 一般用在构造函数中，返回new命令作用于的那个构造函数， 如果这个构造函数不是通过new命令或者reflect.construct()调用，返回undefined
只能在constructor使用new.target别的地方使用或报错。
*/