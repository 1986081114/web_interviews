Array.mmyisarray = function(content){
    return Object.prototype.toString.call(Object(content)) === '[object Array]'
  }
  
  console.log(Array.mmyisarray([]))