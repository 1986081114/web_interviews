
import Dep from "./dep.js"

export default class Observer {
    constructor(data){
        this.traverse(data)
    }
    //递归遍历data里的所有属性
    traverse(data){
        if(!data || typeof data !== 'object'){
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    //给传入的数据设置getter/setter
    defineReactive(obj,key,val){
        this.traverse(val) //传进来的val可能是对象
        const dep = new Dep();
        const that = this;
        Object.defineProperty(obj, key,{
            configurable: true,
            enumerable:true,
            get(){
                Dep.target && dep.addSub(Dep.target);
                return val
            },
            set(newValue) {
                if(newValue === val) {
                    return;
                }
                val = newValue;
                that.traverse(newValue)//设置的可能是一个对象
                dep.notify();
            }
        })
    }
}

/* 
object.defineProperty:
   第三个参数属性描述符，用来描述js对象属性的一些内在特征， 分为数据属性和访问器属性

    数据属性：
      configurable： 是否可以被配置， 被删除
      enumerable： 是否可以枚举
      writable： 是否可以修改属性的值
      value： 表示这个属性的值
    访问器属性：
       configurable [Boolean]同数据属性，不同之处：能否把属性修改为数据属性
       enumerable [Boolean]同数据属性 
       get（）读取属性值的方法触发函数
       set（）写入属性值时候触发这个方法。
     
*/