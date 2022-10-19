//1.双重for循环， 将原数组的数和新数组值对比，没有重复值就添加
//2.indexOf
function unique2(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('type error')
    }
    let res = []
    for (let item of arr) {
        if (res.indexOf(item) === -1) {
            res.push(item)
        }
    }
    return res
}
//3.filter 和indexOf
function unique3(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('type error')
    }
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
}

//4.sort + 相邻元素去重
function unique4(arr) {
    let res = []
    arr = arr.sort()
    for (let i = 0; i < arr.length; i++) {
        if (i == 0 || arr[i - 1] !== arr[i]) {
            res.push(arr[i])
        }
    }
    return res
}

//5.set去重
function unique5(arr) {
    return Array.from(new Set(arr))
}

//6.include
function unique6(arr) {
    let res = []
    for (let item of arr) {
        if (!res.includes(item)) {
            res.push(item)
        }
    }
    return res
}

//7.reduce
function unique7(arr) {
    return arr.reduce((pre, next) => {
        return pre.includes(next) ? pre : [...pre, next]
    }, [])
}

//8.map
function unique8(arr) {
    let res = []
    let map = new Map()
    for (let item of arr) {
        if (!map.has(item)) {
            map.set(item, true)
            res.push(item)
        }
    }
    return res

}

let arr = [12, 1, 12, 3, 1, 88, 66, 9, 66];
let arr2 = ['a', 'v', 'v', 'a', 'l', '6'];

let res2 = unique2(arr2)
console.log(res2)

let res3 = unique3(arr2)
console.log(res3)

let res4 = unique4(arr2)
console.log(res4)

let res5 = unique5(arr2)
console.log(res5)

let res6 = unique6(arr)
console.log(res6)

let res7 = unique7(arr2)
console.log(res7)

let res8 = unique8(arr)
console.log(res8)


//对象数组去重
let arr2 = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 2 },
    { id: 4 },
]

let obj = {}
let res = arr2.reduce((pre, curr) => {
    if (!obj[curr.id]) {
        obj[curr.id] = true
        pre.push(curr)
    }
    return pre
}, [])
console.log(res)