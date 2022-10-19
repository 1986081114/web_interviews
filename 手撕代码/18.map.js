Array.prototype.map = function(callbackfn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
      throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
      throw new TypeError(callbackfn + ' is not a function')
    }
   let arr = Object(this)
   let _this = thisArg
   let len = arr.length>>>0
   let res = new Array(len)

   for(let i = 0; i< len ;i++) {
       if(i in arr) {
        res[i] = callbackfn.call(_this,arr[i], i,arr )
       }
   }
   return res
  }
  

  let data = [4,8,15,16]

let muli = function (item){
  return item * 2
}

let sum = data.map(muli)
console.log(sum ,'----')