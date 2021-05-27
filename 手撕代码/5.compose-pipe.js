//递归实现compose 从右向左
function compose(...funcs) {
    const [fn1, fn2, ...rest] = funcs.reverse();
    
    function composed(...args) {
      return fn2(fn1(...args));
    };
  
    if (rest.length === 0) return composed;
  
    return compose(
      ...rest.reverse(),
      composed
    );
  }
//从左向右
  function pipe(...funcs) {
    const [fn1, fn2, ...rest] = funcs;
    
    function composed(...args) {
      return fn2(fn1(...args));
    };
  
    if (rest.length === 0) return composed;
  
    return compose(
        composed,
      ...rest
     
    );
  }
  
function inc (num) {
    return ++num;
  }

  const func1 = compose(Math.abs, inc)
  const func2 = pipe(Math.abs, inc)
  console.log(func1(-2))
  console.log(func2(-2))