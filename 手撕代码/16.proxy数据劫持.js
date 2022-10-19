//proxy用法：let p = new Proxy(target, handler);
let handler = {
    get: (target, prop) =>{
        return prop in target ? target[prop] : '笨蛋！没有这个属性！'
    },
    set: (target, prop, value) => {
         if (prop === 'age') { // 次数可以进行一些判断拦截操作
          if (!Number.isInteger(value)) {
            throw new TypeError('The age is not an integer');
          }
          if (value > 200) {
            throw new RangeError('The age seems invalid');
          }
        }
        console.log(`监听到啦！！！${target[prop]} --> ${value}`)
        // 设置新值
        target[prop] = value
    }
}
let instance = new Proxy({}, handle)

console.log(instance.age = 8)
console.log(instance.age = 9)
console.log(instance.a)
// 监听到啦！！！undefined --> 8
// 监听到啦！！！8 --> 9
// 笨蛋！没有这个属性！


/* 第26题 实现 arr[-1] = arr[arr.length - 1] */
function createArr (...elements) {
  let handler = {
    get (target, key, receiver) { // 第三个参数传不传都可以
      let index = Number(key)
      if (index < 0) {
        index = String(target.length + index)
      }
      return Reflect.get(target, index, receiver)
    }
  }
  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}
var arr1 = createArr(1, 2, 3)
console.log(arr1[-1]) // 3
console.log(arr1[-2]) // 2