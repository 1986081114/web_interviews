
async function getData() {
    console.log(1)
    await fn()
    let data = await axios.get('./data.json')
    console.log(data)  //这个不执行 ，因为fn返回的promise无状态，相当于中断了promise执行,不会继续执行后面的代码
  }
  
  function fn() {
    console.log(4)
    return new Promise ((resolve, reject) => {
      console.log(5)
    }).then(() => {
      
      console.log(6)
    }).then(() => {
      console.log(7)
    })
  }
  console.log('start')
  
  setTimeout(() => {
    console.log(2)
    
  }, 0);
  getData()
  console.log('end')