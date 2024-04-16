/* 
  由来：js语言中，生成实例对象的传统方法是通过构造函数，但是和传统面向对象语言相比差异过大
    容易让新人感到困惑，所以引入class的概念
 class 是一个语法糖，只是让对象原型的写法更加清晰

 类的 构造方法construct方法指向自身,类的所有方法都指向类的prototype
 且所有的方法都是不可枚举的 console.log(Object.keys(Point)) // []
*/

/* 
 类的实例
  类的属性和方法除非显式定义在其本身（this）。否则都是定义在原型上
    console.log(point.hasOwnProperty('x')) // true
    console.log(point.hasOwnProperty('toString')) // false
  类的所有实例共享一个原型对象
*/

/* 
  class表达式
    const myClass = class test {
        getClassName() {
            return test.name
        }
    }
    let inst = new myClass();
    console.log(inst.getClassName()) // test
    这个类的名称（test）只能在类内部使用
*/

/* 
 静态 static
   类相当于所有的实例的原型，类中定义的方法都会被实例继承，但是如果加上
   static关键字就不会被实例继承，但是可以通过extends被子类继承
*/

/* 
 私有属性： 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问
   在早期可以通过 命名（_bar下划线表示私有方法）， symbol命名方法（一般无法获取，但依旧可以通过Reflect.ownKeys获取到名称）

   现在可以通过 # 表示私有属性

   私有属性只能在类内部访问，只要在类的内部，实例也可以引入私有属性
     class Foo{
        #privateValue = 1;
        static getPrivate(foo) {
            return foo.#privateValue;
        }
    }

    console.log(Foo.getPrivate(new Foo())) // 1

    可以使用 in判断是否存在某个私有属性
    #privateValue in this // 返回布尔值
    但如果修改原型链的继承，子类不会获取父类的私有属性，所以in也无效

*/

/* 
   静态块： 对静态属性做初始化，在类生成时运行且只运行一次，在类新建实例，不运行（写到construct每次创建实例都运行）

   class C {
      static x = ...;
      static y;
      static{
        try{
           this.x = ...
           this.y = ....
        } catch {
         
        }
      }
   }

*/

/* 
 this 指向
   类的内部this默认指向 类的实例， 但如果单独使用，会报错
   class Logger {
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }
        print(text) {
            console.log(text);
        }
    }

    const logger = new Logger();
    const { printName } = logger;
    printName(); // TypeError: Cannot read property 'print' of undefined
    // 将实例方法提取出来，this会指向该方法运行时所在的环境

    箭头函数 就不会报错或者 在构造函数内绑定this
    printName = (name = 'there') => {
        this.print(`Hello ${name}`);
    }
    this.printName = this.printName.bind(this)

*/
/* 
  super : 即可以是对象也可以是函数
    
   super表示父类的构造方法,也可以用来新建父类的实例对象,super内部的this指向的是 实例
   子类必须在构造函数中 调用super，否则会报错
   这是因为es6的继承机制,
   es5的 继承机制是先创造一个独立的子类实例对象然后再将父类的方法添加到这个对象上，实例在前，继承在后。
   es6是先将父类的属性和方法加到一个空的对象上，然后再将该对象座位子类的实例,  继承在前，实例在后

   es6必须调用super方法才会生成继承父类的this的对象，没有这一步无法继承父类。
   所以在每次新建实例时，  父类的构造函数都会运行一次

   super为对象时，指向父类的原型对象，在静态方法中指向父类,所以在父类实例的方法或属性无法通过super获取
   super = 父类.prototype
   但是当super对某个属性赋值是，super就是this
   在子类实例中使用super对象，内部this指向子类实例
        class A {
            constructor() {
                this.x = 1;
            }
            print() {
                console.log(this.x);
            }
        }
        class B extends A {
            constructor() {
                super();
                this.x = 2;
            }
            m() {
                super.print();
            }
        }

        let b = new B();
        b.m() // 2
    关于super的 this指向  https://es6.ruanyifeng.com/#docs/class-extends
*/

/* 
 extends: 继承父类所有的属性和方法
  父类的所有属性和 方法都会被子类继承，除了私有属性和方法
  父类的静态方法和属性，也会被子类继承，静态属性是通过浅拷贝方式继承的,所以如果属性是个对象，子类改变父类也会改变

*/