/* 
  运行错误的捕获方式：
     即时运行错误的捕获方式
      1.try..cache
      2.window.onerror
    资源加载错误：
       1.object.onerror
       2.performance.getEntries
       3.error事件捕获
          window.addEventListener('error;, true)

    js跨域怎么捕获错误：
       给script标签添加 crossorigin
       设置js资源响应头， access-control-allow-origin: *
    上报错误：
     采用ajax上报
     采用image上报（new Image()）.src = 'url'更简单
*/