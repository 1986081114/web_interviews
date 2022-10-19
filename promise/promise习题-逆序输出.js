
const promiseArr =  (ajaxArr) => {
    return new Promise(async resolve => {
      let arr = [];
      for(let ajax of ajaxArr) {
        let data = await ajax()
        arr.push(data)
      }
      resolve(arr)
    })
  }
  
  /* 
  const promiseArr = (ajaxArr) => {
    return new Promise(resolve => {
      let arr = []
      ajaxArr.reduce((start, nextPromise) => {
        return start.then(nextPromise).then(data => {
          arr.push(data)
          if(arr.length === ajaxArr.length) {
            resolve(arr)
          }
        })
      }, Promise.resolve())
    })
  }
  */
  let timeout = (ms) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
  
  
  let ajax1 = () => timeout(2000).then(data => {
    console.log('1')
    return 1
  })
  
  let ajax2 = () => timeout(1000).then(data => {
    console.log('2')
    return 2
  })
  let ajax3 = () => timeout(500).then(data => {
    console.log('3')
    return 3
  })
  
  promiseArr([ajax1, ajax2, ajax3]).then(data => {
    console.log('done')
    console.log(data)
  })
  //// 希望数据顺序执行为 '1', '2', '3', 'done', [1, 2, 3]
  
  
  