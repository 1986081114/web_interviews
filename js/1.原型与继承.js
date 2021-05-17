/*
      实例对象有__proto__,没有prototype，有constructor
      构造函数有prototype，同时prototype又是对象， 所以也有 __proto__，constructor
      构造函数的prototype的constructo指向本身， M.prototype.constructor === M

      o.__proto__ = M.prototype
      o.__protype // undefined

      实例对象本身并无constructor，但是他会借助原型链像上查找
        o.constructor === M.prototype.constructor
        o.constructor === M
*/
/*
 每个对象（除null）都有__proto__属性，这个属性会指向该对象的原型
  __proto__隐式原型属性,对象独有的， 一个对象指向另一个对象，即指向他们的原型对象，对象的proto指向其构造函数的原型（Person.prototype）
          作用： 当访问一个对象的属性时，如果该对象内部不存在这个属性，就回去proto属性指向的对象查找，如果还不存在，继续向上查找，直到原型链顶端 null，
          以上通过proto属性一层一层向其原型查找直到null而形成的链式解构称为原型链
*/
/*
prototype：
 prototype是函数特有的， 函数的prototype指向一个对象， 这个对象正是调用该构造函数而创建对象的原型，
  原型： 每个js对象（除null）在创建的时候都会与之关联另一个对象， 这个对象就是我们所说的原型 如Person.prototype就是person1的原型
原型指的是构造函数的prototype，其上的属性和方法能让基于此构造函数创建的对象去使用
       函数的原型对象， 他的作用就是包含可以由特定类型的所有实例共享的属性和方法，也就是让该函数所实例化的对象们都可以找到
        公用的属性和方法
*/
/*
constructor:
  每个原型都有constructor指向它的构造函数， 原型Person.prototype  构造函数是Person, 所以，Person === Person.prototype.constructor
*/

