export default class Dep{
    constructor(){
        //存储所有的观察者
        this.subs = []
    }
    //添加观察者
    addSub(watcher){
        if(watcher && watcher.update) {
            this.subs.push(watcher)
        }
    }

    //发送通知
    notify(){
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}

//dep在那里实例化， 在哪里addDEP
//在observe遍历各个属性实例化,在get的时候adddep
//dep.notify在哪里调用
 //在observe set时候notify