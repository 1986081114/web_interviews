import Dep from "./dep.js";
export default class Watcher{
    /**
     * 
     * @param {*} vm  vue实例
     * @param {*} key  data属性名
     * @param {*} cb   负责更新视图的回调
     */
    constructor(vm, key, cb){  
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;
        //保存当前的值，当下一次进来就是之前的值了，触发get方法
        this.oldValue = vm[key];
        Dep.target = null;


    }
    //当页面发生变化更新视图
    update(){
        let newValue = this.vm[this.key]
        if(this.oldValue === newValue){
            return
        }
        this.cb(newValue)
    }
}

//watcher,初始化oldValue会，进行什么操作
  //添加依赖
//通过vm[key]获取oldValue前，为什么将当前实例挂载到dep，获取后为什么置为空。
   //因为获取这个值的时候，需要给他添加依赖，依赖收集的就是watcher，所以需要暂存一下，加进去了就可以置为null了

//update方法什么时候执行
  //在notify的时候