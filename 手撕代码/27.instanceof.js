function myInstance(left,right) {
    if(typeof left !== 'object' || left == null)  return false
    let rightProto = right.prototype;
    let leftPoto = left.__proto__
    while(true) {
        if(leftPoto == null) {
            return false
        }
        if(leftPoto == rightProto) {
            return true
        }
        leftPoto = leftPoto.__proto__
    }
}

let res1 = myInstance('111', String)
let res = myInstance(new String('111'), String)
console.log(res1,res)