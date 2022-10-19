/* 
  js原生类型只有array和object， 而在es6中新增了map和set，四种类型结构都有着字节特别的内部实现， 但是让想要用一套相同的
  规则去遍历所以就产生了迭代器，
  es约定任何数据结构只要拥有了symbol.iterator属性， 就可以被for of循环和迭代器next遍历
*/
function iteratorGenerator(list){
    let idx = 0
    let len = list.length 
    return {
      next: function(){
        let done = idx >=len
        let value = !done?list[idx++] : undefined
        return {
          done:done,
          value:value
        }
      }
    }
  }
  
  let iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
  iterator.next()
  iterator.next()
  iterator.next()
  iterator.next()