Array.prototype.reduce  = function(callbackfn, initialValue) {
    if(this == null || this == undefined){
        throw new Error('55')
    }
    if(typeof callbackfn !== 'function') {
        throw new Error('fun')
    }

    let arr = Object(this)
    let len = arr.length
    let k = 0;
    let res = initialValue
    if(res == undefined) {
        for(;k<len;k++) {
            if(k in arr) {
                res = arr[k]
                k++;
                break
            }
        }
    }
     // 表示数组全为空
    if(k == len && res == undefined) {
      throw new Error('Each element of the array is empty');
    }
   console.log(k, len)
    for(; k <len; k++) {
        if(k in arr) {
          // 注意，核心！
          res = callbackfn(res, arr[k],k)

        }
    }
    return res
}


let data = [4,8,15,16,23,42]

let add = function (a,b){
  console.log(a)
return a+b
}

let sum = data.reduce(add,1)
console.log(sum ,'----')