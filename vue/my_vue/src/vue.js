import Observe from './observer.js'
import Compiler from './compiler.js';

/* 
包括vue构造函数， 接受各种配置
*/
export default class Vue {
    constructor(options = {}){
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;
        
        //检查el是否合规
        this.initRootElement(options)
        //data里数据挂载到vue实例中
        this._proxyData(this.$data)

        //实例化observe，监听数据变化
        new Observe(this.$data)
        //实例化compiler，解析指令和模板表达式
        new Compiler(this)
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
    //遍历数据，属性上添加get， set方法。挂载到实例上
    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable:true,  //是否可以枚举
                configurable:true,// 是否可以修改
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
}