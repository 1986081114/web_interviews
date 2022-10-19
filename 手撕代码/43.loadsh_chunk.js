/* 

数组按照指定长度划分
*/

function chunk(arr, length) {
    let newArr = [];
    if(length == 0 || arr.length <=0) return []
    for (let i = 0; i < arr.length; i += length) {
      newArr.push(arr.slice(i, i + length));
    }
    return newArr;
  }
  let res1 = chunk(['a', 'b', 'c', 'd'], 2)
  console.log(res1)
  // => [['a', 'b'], ['c', 'd']]
  
  let res2 = chunk(['a', 'b', 'c', 'd'], 3)
  console.log(res2)
  // => [['a', 'b', 'c'], ['d']]
  
  let res3 = chunk(['a', 'b', 'c', 'd'], 5)
  console.log(res3)
  
  let res4 = chunk([], 5)
  console.log(res4)
  // => [['a', 'b', 'c', 'd']]
  
  let res5 = chunk(['a', 'b', 'c', 'd'], 0)
  console.log(res5)