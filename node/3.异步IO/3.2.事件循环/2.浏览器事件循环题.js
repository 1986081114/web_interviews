setTimeout(function () {
    console.log("set1");
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      new Promise(function (resolve) {
        resolve();
      }).then(function () {
        console.log("then4");
      });
      console.log("then2");
    });
  }); 
  
  new Promise(function (resolve) {
    console.log("pr1");
    resolve();
  }).then(function () {
    console.log("then1");
  });
  
  setTimeout(function () {
    console.log("set2");
  });
  
  console.log(2);
  
  //相当于一个自定义的微任务
  queueMicrotask(() => {
    console.log("queueMicrotask1")
  });
  
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    console.log("then3");
  });
  
  /* 
  先执行同步任务， 微任务， 宏任务，只有微任务没有了才会执行宏任务

    执行第一个settimeout的时候，》then内的是微任务， 
    new Promise(function (resolve) {
        resolve();
      }).then(function () {
        console.log("then4");
      }); 放入微任务队列
    所以继续执行， then内是微任务， 所以把then4放入微任务队列
    问任务队列有任务就继续执行输出then4
    最后确定没有了微任务执行红任务输出set2
  
  */
  // pr1
  // 2
  // then1
  // queuemicrotask1
  // then3
  // set1
  // then2
  // then4
  // set2
  