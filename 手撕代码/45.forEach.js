Array.prototype.myForEach = function(callback, context=window){
    let self = this,len = self.length
    for(let i =0; i<len; i++){
      typeof callback == 'function' && callback.call(context, self[i],i)
    }
  }