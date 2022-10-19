function calculator(object) {
    const objectType = typeof object;
    switch(objectType) {
        case 'string':{
            return objectType.length * 2;
        }
        case 'boolean':{
            return 4;
        }
        case 'number': {
            return 8;
        }
        case 'object': {
            if(Array.isArray(object)) {
                //对数组处理
                return object.map(calculator).reduce((res,curr) => res + curr, 0)
            }else {
                return sizeofObject(object)
            }
        }
        default: {
            return 0
        }
    }
}

//存储重复的对象值
const seen = new WeakSet()

function sizeofObject(object) {
    if(object == null) {
        return 0
    }
    let bytes = 0
    //对象key也占用空间
    const keys = Object.keys(object);
    for(let i = 0; i< keys.length; i++) {
        const key = keys[i]
        //判断对象的value是否重复
        if(typeof object[key] == 'object' && object[key] !== null) {
            if(seen.has(object[key])) {
                continue
            }
            seen.add(object[key])
        }
        bytes += calculator(key)
        bytes += calculator(object[key])
    }
return bytes
}

const data = {
    a: 111,
    b: true,
    c: {f: 8650}
}
console.log(calculator(data))
   