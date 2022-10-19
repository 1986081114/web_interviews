function numFormat(num) {
    num = num.toString().split(".")
    let arr1 = num[0].split("").reverse();
    let res = [];
    for(let i = 0; i<arr1.length; i++) {
        if( i %3 ===0 && i !==0) {
            res.push(",")
        }
        res.push(arr1[i])
    }
    res.reverse();
    if(num[1]) {
        res = res.join("") + "." + num[1]
    }else {
        res = res.join("")
    }
    return res
}