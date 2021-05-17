/* 
 1.传统的js程序使用函数和基于原型的继承来创建可重用的组件
*/
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "hello" + this.greeting
    }
}
let greeter = new Greeter("world")
//2.继承
class Animal {
    move(distance: number = 0) {
        console.log(`animal moved ${distance}m`)
    }
}
class Dog extends Animal {
    bark() {
        console.log("woof")
    }
}
const dog = new Dog();
dog.bark();
dog.move() //move 0
dog.move(10) //move 10

//3.多态，重写父类方法

class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName
    }
    move(distace: number = 0) {
        console.log(`${this.name} moved ${distace}`)
    }
}
class Dog extends Animal {
    dogname: string
    //constructor有几个参数在new的时候就要传进来几个参数
    constructor(name: string, dogname: string) {
        //派生类包含一个构造函数， 必须包含super， 他会执行基类的构造函数， 而且在构造函数访问this属性之前 一定要调用super
        super(name)
        this.dogname = dogname
    }
    fathermove(distance = 5) {
        super.move(distance)
    }
    //重写父类的方法
    move(distace = 6) {
        console.log(`${this.dogname}` + distace)

    }
}

let dog = new Dog("dog", "mary") //
//let dog: Animal = new Dog("dog", "mary"),如果这样吧dog定义成animal类型，就不要包括animal其余的方法，例如fathername方法，因为父类没有
dog.move(15) //mary 15 调用的是自己的方法
dog.fathermove(19) // dog moved 19 调用的是父类的方法

//4.共有，私有，受保护的修饰符
/* 
在ts里成员默认都是public
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
*/
/* 当成员标记成private， 他就不能在声明她的类外部访问，如果其中一个类型里包含一个private成员， 
那么只有当另一个类型中也存在这样一个private成员， 并且都是来自同一处声明，才认为这两个类型是兼容的 protected类似
 */
class Animal {
    private name: string;
    constructor(theName: string) {
        this.name = theName
    }
    public test() {
        console.log(this.name)
    }
}

class Rhino extends Animal {
    constructor() {
        super("rhino")
    }
}
class Employee {
    private name: string;
    constructor(theName: string) {
        this.name = theName
    }
}

let animal = new Animal("animal")
let rhino = new Rhino;
let employee = new Employee("Bob")
//animal.name不能这么访问，因为是私有的
//animal.test()可以输出animal.访问私有变量    但是如果public改成private就不能访问了
//rhino.test().输出rhino

animal = rhino//正确，这两个私有变量来自一处 ，animal.name是错误的，因为name是私有的，
animal = employee//错误，不兼容

//protected与private很相似，但是成员在派生类中可以访问
class Animal {
    private name: string;
    protected age: number;

    //如果是 new constructor 不能使用 new Animal， 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
    constructor(theName: string, theAge: number) {
        this.name = theName
        this.age = theAge
    }
}

class Rhino extends Animal {
    private department: string;

    constructor(name: string, age: number, department: string) {
        super(name, age)
        this.department = department;
    }
    //这里直接错误，不能访问父类private变量
    /* public getprivate() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    } */
    public getPublic() {
        return `Hello, my age is ${this.age} and I work in ${this.department}.`;
    }
}
//注意顺序，不能论 string number string
let howard = new Rhino("Howard", 20, "Sales");
console.log(howard.getPublic());
console.log(howard.age); // 错误  protected只能自己和子类访问， howard不是子类

//5.只读 readonly ，不能修改，只能在声明时或者构造函数里被初始化

//6.存取器：
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
/* 
可以随意设置fullname的值， 非常方便吗但是这也会带来麻烦， 
ts支持通过get/set来截取对象成员的访问， 帮助有效的控制对对象成员的访问

只设置get没有set，会被默认设置为readonly
*/
class Man {
    public _name: string;
    constructor(msg: string) {
        this._name = msg;
    }
    get myName(): string {
        return this._name;
    }
    set myName(newName: string) {
        this._name = newName;
    }
}

let man = new Man("James");
console.log(man.myName); // James
man.myName = "wade";
console.log(man.myName); // wade

//7.静态属性：静态属性只属于类本身，而不是类的实例，可以通过普通方法访问,可以继承
class Man {
    static nameSta: string = "static"
    static player: string;
    constructor(thePlayer: string) {
        //这里一定要用Man而不能使this
        Man.player = thePlayer;
    }
    show1() {
        console.log(Man.player)
    }
    show2() {
        console.log(Man.nameSta)
    }
    static show3() {
        console.log(Man.player)
    }
}
class Person extends Man {
    constructor() {
        super("person")
    }

}
let man = new Man("footballer");
//man.player//错误
Man.player
man.show1() //footballer
man.show2()//static
//man.show3()//报错
Man.show3()//footballer
let person = new Person();
//person.player 错误
person.show1()
person.show2()
//person.show3() 错误
Person.player
Person.show3()

//8.抽象类：  抽象类时提供其他派生类的基类，但是不能实例化（也就是不能new）  不同于接口，
//抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。 
//抽象类的中定义的方法再派生类必须实现，抽象类不能有任何实例化，就像一个类的要求， 其余得类可以继承这个抽象类作为基准，
abstract class Man {

    constructor(public name: string) {

    }
    show() {
        return "我的名字：" + this.name
    }

    abstract play(type: string): void; //这个方法必须在派生类中实现，不然派生类就会报错
}

class Player extends Man {

    constructor(name: string) {
        super(name)   //派生类中的构造函数必须调用super()
    }
    play(type: string) {
        return "我的职业是" + type;
    }
    go() {
        return "冲冲冲";
    }
}
let man: Man;  //可以创建一个对抽象类的引用
man = new Man("James"); // 错误，不能创建一个抽象类的实例
man = new Player("Wade"); //可以对一个抽象子类进行进行实例化和赋值
man.go();    //错误，go方法在声明的抽象类中不存在
man.play("basketball"); //"我的职业是basketballer"

//构造函数，每次调用new class 都会调用constructor
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        return Greeter.standardGreeting;

    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());//hello there

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());//hey there
/*

我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者说保存了类构造函数。
 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。
 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。
  之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter的实例。
*/