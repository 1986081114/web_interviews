// self 代表子线程自身，即子线程的全局对象
self.addEventListener("message", function (e) {
    // e.data表示主线程发送过来的数据
    self.postMessage("worker线程收到的：" + e.data); // 向主线程发送消息
  });