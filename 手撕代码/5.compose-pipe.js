//递归实现compose 从右向左
function compose(...fn) {
  if(!fn.length) return (v) => v
  if(fn.length ==1) return fn[0]
  return fn.reduce((pre,curr) => (...arg) => pre(curr(...arg)))
 }
 

 function pipe(...fn) {
  if(!fn.length) return  (v) => v 
  if(fn.length ==1) return fn[0]
  return fn.reduce((pre,curr) => (...args)=> curr(pre(...args)))
 }

 function inc (num) {
   return ++num;
 }
 const func1 = compose(Math.abs, inc)
 const func2 = pipe()

 console.log(func1(-2))
 console.log(func2(-2))