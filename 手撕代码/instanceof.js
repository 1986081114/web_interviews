function my_instanceof(leftVaule, rightVaule) {
    if (typeof leftVaule !== 'object' || leftVaule === null) return false;
    let rightProto = rightVaule.prototype,
        leftProto = leftVaule.__proto__;
    while (true) {
        if (leftProto === null) {
            return false;
        }
        if (leftProto === rightProto) {
            return true;
        }
        leftProto = leftProto.__proto__
    }
}

let num = 1
let arr = []
let val = my_instanceof(arr, Object)
console.log(val)