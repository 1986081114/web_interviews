
 /*   vue双向绑定原理：
       vue数据双向绑定主要是通过劫持数据结合发布者-订阅者模式实现的。

       vuw通过Object.defineProperty()实现数据劫持。通过Object.defineProperty(),设置对象的属性，对其set， get重写，
       顾名思义，get就是在读取属性的时候触发的函数，set就是在设置属性的时候出发的函数。

       mvvm包含两个方面， 数据变化更新视图，试图变化更新数据。
        关键在于date如何更新view，因为view更新其实可以通过设置事件监听即可，那么如何知道数据变了，
        就是用Object.defineProperty()对属性设置set函数， 但数据改变了就触发这个函数， 通知视图更新

        实现： 
           1.首先对数据进行监听： 设置一个监听器Observer，用来监听所有属性。如果属性变化就告诉订阅者
           2.实现订阅器Dep， 用来收集订阅者， 对监听器Observer和订阅者Watcher统一管理（可能一个数据变化，所有依赖他的订阅者都得到通知）
           3.实现订阅者， watcher，可以收到属性的变化通知并执行相应的方法， 从而更新视图
            4.Compile 解析器：可以解析每个节点的相关指令， 对模板数据和订阅器初始化*/


   //1.监听器observer实现，监听所有的data
   function observer(data) {
      if(!data || typeof data !== "object") {
         return
      }
     Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
     })

   }

   function defineReactive(data ,key, val){
      //递归监听所有的属性
      observer(val)
      var dep = new Dep();
      Object.defineProperty(data, key,{
         get: function(){
            //dep.target是一个静态属性， 
            if(Dep.target) {
               dep.addSub(Dep.target)
            }
            return val
         },
         set:function(newVal) {
            if(val !== newVal) {
               val = newVal
               dep.notify()
            }
         }
      })
   }

   //订阅器Dep：Dep类：负责依赖收集（收集订阅，触发订阅者）
   function Dep() {
      this.subs = [];
   }
   Dep.prototype.addSub = function(watcher) {
      this.subs.push(watcher)
   }
   Dep.prototype.notify = function() {
      this.subs.forEach((watcher) => watcher.update)
   }
   Dep.target = null;

   //watcher订阅者； 主要是接收属性的变化， 然后去执行函数更新视图
    /* 
    所以有两个步骤： 将watcher添加到dep容器中， 这里监听器的get函数，
     接收通知，执行更新函数
    */
   function Watcher(vm, prop,callabck){
      this.vm = vm;
      this.prop = prop;//是 node 节点的 v-model 等指令的属性值 或者插值符号中的属性
      this.callabck = callabck;
      this.value = this.get()//  // 将自己添加到订阅器的操作
   }
   Watcher.prototype = {
      update :function() {
         const value = this.vm.$data[this.prop];
         const oldVal = this.value;
         if(value !== oldVal) {
            this.value = value;
            this.callabck(value)
         }
      },
      get:function () {
         Dep.target = this;//存储订阅器
         const value = this.vm.$data[this.prop];//属性会监听，这一步会执行observer里面的get方法
         Dep.taeget = null;
         return value;
         
      }
   }
   //	通过监听器 Observer 订阅器 Dep 和订阅者 Watcher 的实现，其实就已经实现了一个双向数据绑定的例子，但是整个过程都没有去解析 dom 节点，
     // 而是直接固定某个节点进行替换数据的，所以接下来需要实现一个解析器 Compile 来做解析和绑定工作。解析器 Compile 实现步骤：
  
   




     //Object.defineProperty的缺陷
     /* 
      1.,Object.defineProperty的第一个缺陷,无法监听数组变化
      2.无法检测到对象属性的新增或删除
      proxy兼容性有很大问题
     */

  /*  发布订阅模式
   
   watcher类：负责订阅一些事件 

   class Dep{
      constructor(){
         //这个数组存放订阅者信息
         this.subs = []
      }
      //向数组中添加订阅者信息
      addSub(watcher) {
         this.subs.push(watcher)
      }
      //发布通知的方法
      notify() {
         this.subs.forEach((watcher)=> watcher.update())
      }
   }

   class watcher{
      constructor(cb){
          this.cb = cb
      }
      //触发回调方法
      update() {
         this.cb()
      }
   }

   const w1 = new watcher(() => {
      console.log(1)
   })

   const w2 = new watcher(() => {
      console.log(2)
   })
   const dep = new Dep();
   dep.addSub(w1);
   dep.addSub(w2);

   //只要我们为vue中data数据更新赋值， 这个赋值动作会被vue监听，到，然后vue会把数据的变化通知给每一个订阅者，
   //订阅者（dom元素）更新最新的数据，
   dep.notify()
     */     
         


    /* 再说一下vue2.x中如何监测数组变化
    使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。
    如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。
    
  */
 /* 
  vue3响应式数据原理
     vue3改用proxy代替object.defineProperty
     因为proxy可以直接监听对象和数组的变化， 并且多达13种拦截方法， 并且作为新标准将受到浏览器厂商重点持续的性能优化，
     proxy只能处理对象的第一层， vue3是怎么处理这个问题的呢？
       判断当前Reflect.get的返回值是否为object， 如果是在同过reactive方法处理， 这样就实现了深度观测
       检测数组的时候可能触发多次get/set， 那么如何防止多次触发， 可以判断key是否为当前被代理对象target自身属性， 也可以判断
         新值旧值是否相等， 只要满足以上条件之一， 才有可能执行trigger。
 */
/* 

proxy和object.defineProperty对比：
   proxy优势：
      proxy可以直接监听对象而非属性
      proxy可以之间监听数组的变化， 
           proxy多达13种拦截方法， apply， ownkey， has等是defineProperty不具备的
           proxy返回的是一个新对象，可以只操作新对象达到目的， defineProperty只能遍历对象属性修改。
           proxy作为新标准收到浏览器厂商重点持续的性能优化，性能红利
   defineProperty优势：
     兼容性好，
*/