function getType(obj){

    if(obj == null) return String(obj)
    if(typeof obj !== 'object'){
      return typeof obj
    }else {
      return Object.prototype.toString.call(obj).replace('[object', '').replace(']','')
    }
  }
  
  
  console.log(getType(null))
  console.log(getType(undefined))
  console.log(getType({}))
  console.log(getType([]))
  console.log(getType(123))
  console.log(getType(true))
  console.log(getType('123'))
  console.log(getType(/123/))
  console.log(getType(new Date()))