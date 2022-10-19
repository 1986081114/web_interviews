1. 首先创建文件目录， 并实现index.html ,主页面

2. 初始化vue类

     

   ```js
   export default class Vue {
       constructor(options = {}){
           this.$options = options;
           this.$data = options.data;
           this.methods = options.methods;
   
           this.initRootElement(options)
       }
       //获取根元素， 并存储到vue实例， 简单检查下传入的el是否合规
   
       initRootElement(options){
           if(typeof options.el == 'string') {
               this.$el = document.querySelector(options.el)
           } else if(options.el instanceof HTMLElement){
               this.$el = options.el
           }
           if(!this.$el){
               throw new Error('传入的el不合法， ')
           }
       }
   }
   ```

3. 实现一个index.js验证

    

   ```js
   import Vue from '../src/vue.js'
   const vm = new Vue({
       el:'#app',
       data:{
           mag:'hello vue'
       },
       methods:{
           handler(){
               alert(111)
           }
       }
   })
   console.log(vm)
   在index.html引入这个， 由于是模块，所以在引入到时候需要标明类型 module。
   ```

4. 将data挂载到实例上

    

   ```js
    _proxyData(data){
           Object.keys(data).forEach(key => {
               Object.defineProperty(this, key, {
                   enumerable:true,
                   configurable:true,
                   get: function(){
                       return data[key]
                   },
                   set: function(newValue){
                       if(data[key] === newValue){
                           return
                       }
                       data[key] = newValue
                   }
               })
           })
       }
   ```

5. 声明几个核心类 

   ​    

   ```js
   export default class Dep{
       constructor(){
           //存储所有的观察者
           this.subs = []
       }
       //添加观察者
       addSub(watcher){}
   
       //发送通知
       notify(){}
   }
   
   export default class Observer {
       constructor(data){
           this.traverse(data)
       }
       //递归遍历data里的所有属性
       traverse(data){}
       //给传入的数据设置getter/setter
       defineReactive(obj,key,val){}
   }
   
   export default class Watcher{
       constructor(vm, key, cb){
   
       }
       //当页面发生变化更新视图
       update(){}
   }
   
   export default class Compiler {
       constructor(vm){
           this.compile(vm.$el)
       }
       //编译模板
       compile(el){}
   
   }
   ```

6. 实现