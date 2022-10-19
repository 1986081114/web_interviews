/* 
 vuex是一个专门为vuejs应用开发的状态管理模式， 它采用集中式存储管理应用的所有组件的状态， 并以相应的规则保证每个状态都已一种可预测的
 方式改变。
   多个视图依赖一个状态。
   来在不同的视图的行为需要变更同一个状态
*/
/* 
vuex和全局变量的区别：（特点）
   vuex状态存储是响应式的，当vue操你个store中读取状态的时候， 若store中状态发生变化， 那么相应的组件也会变化。
   不能直接修改store中的状态， 修改store中的状态的唯一方法就是显示的提交commit mutation， 这样可以方便追踪每一个状态的变化，
*/
/* 
 vuex中action有返回值吗？
 store.dispatch可以处理被触发的action处理函数返回的promise， 并且store.dispatch返回仍然是promise。
 action通常是异步的， 要知道action什么时候结束， 或者多个action处理更复杂的异步流程， 可以通常定义action返回promise。
 这样就可以通过处理返回的promise处理下一步操作
*/

const store = new Vuex.Store({
  state:{
      counter:100
  },
  mutations:{
      increment(state) {
          state.counter ++
      }
  },
  actions:{
      //默认参数context，可以传递参数 
      updateInfo(context,payload){
          setTimeout(()=> {
               context.commit("powerCounter")
          })

      }
  },
  //类似于计算属性
  getters:{
     powerCounter(state) {
         return state.counter * state.counter
     },
     //可以传getters，使用之前的属性
     moreLngth(state, getters) {
         return getters.powerCounter.length
     },
     //也可以是函数
     moreAge(state) {
         return function(age) {
             return state.counter >age

         }
     }
  },
  modules:{
      a: modulesA
  }

})

const modulesA ={
    state: {
        name: "zhangsan"
    },
    mutations: {
        aupdate() {

        }
    },
    getters:{
        //rootState获取父级的state
        fullname(state, getters, rootState){

        }

    }

}






 /* 1. state： 应用状态的数据结构，
  单一状态树（单一数据源）：
    在一个vue项目里，只能由一个store， 
    如果在一个项目里有多个store，将一些状态保存到多个store中，那么之后的管理和维护变得困难
    所以vuex使用单一状态树管理应用层级的全部状态， 单一状态数能够直接找到某个状态的片段，在之后的维护和调试过程中 ，也方便 

    state响应式： 当state中的数据发生变化， vue组件会更新，
        遵循规则:
           提前在store中初始化好所需属性， 
           当给state对象添加新属性， 使用如下方法“”
              vue.set()
              用新对象给旧对象赋值

2.mutations: vuex的状态更新唯一方式 提交mutatios
改变state 通过mutatiosn
 this.$store.commit("increment")

 mutations主要包括两部分：
   字符串事件类型
   一个回调函数，该回调函数第一个参数就是state,后续可以自己传参数（这个参数叫payload）
    mutatios定义方式：
     mutations： {
   increments（state,count）{
       state.counter +count
   }
    }
    mutatios更新方式：
       this.$stores.commit("increment", count)

       

 3. getters：
   类似于组件内的计算属性： 
     1. $store.getters.powerCounter//属性
      2.但是如果getters需要得到一些参数：
            那么在getters里就要返回一个函数
            moreAge(state) {
                return function(age) {

                }
            }
                $stores.getters.moreAge(20)//函数

4.actions:进行异步操作

  action类似与mutation，不同在于：
    action提交的是mutation，而不是直接改变状态， 
    action可以执行异步操作，mutation必须是同步的

    通常情况下， vuex要求我们mutations中的方法必须是同步操作，主要是因为当我们使用devtool时， devtool可以帮助我们不获mutations的操作
     但是如果在mutations中使用异步操作， 不能知道状态时何是更新的， devtools将不能很好的追踪这个操作什么时候完成，给调试带来困难。
    如果有异步操作增加一个actions，在进行mutations，不是替代
    context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

    this.$store.dispatch("updateInfo")
     context.commit("powerCounter")
------------------------------
     如果想要回调函数，告诉异步完成
     这里使用then，需要action里面返回的时promise
     this.$store.dispatch("updateInfo").then(
         (res) => {
         }
     )
     updateInfo(context,payload){
         return new Promise((resolve,reject) => {
             操作....
             resolve(res)
         })

      }


5.modules:
   module时模块的意思， vue使用单一状态树， 意味着，很多状态都会交给vuex处理。当项目够大， store对象可能变得相当臃肿， 为了解决这个
   问题，vuex允许我们将store分割成模块module， 每个模块就像一个小的stores， 拥有自己的state， mutations， actions， getters， modules


      想使用子modules里面的state :this.$store.a.name
      使用子模块的mutations：this.$store.commit("aupdate") vuex会默认自己查找
      子模块getters：  this.$store.getters. fullname,  rootGerter可以调用父组件的getters
      子模块actios： context.commit("")

     如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
     如果不设置，namespaced不同的模块的mutations在同一层级，因此，此时通过commit 提交 commutaion 来变更 state 
     不需要在 mutation 之前添加 模块名this.$store.commit('xMutation', 1);
     添加了namespaced： 需要添加前缀，this.$store.commit('modulex/xMutation', 1);

      如果你希望使用全局 state 和 getter，rootState 和 rootGetters 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
 */


