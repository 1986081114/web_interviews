/* 

 进程是cpu资源分配的最小单位
 线程是cpu调度的最小单位

node中的事件循环由libuv实现的，  libuv主要维护了一盒eventloop和work threads

操作系统同通常有两种方式：
    阻塞式调用：调用结果返回之前，线程处于阻塞状态， 调用线程只有得到调用结果之后才会继续执行
    非阻塞调用： 调用结束之后当前线程不会停止执行， 只需要过一段时间检查一下有没有结果返回即可

    开发过程中很多使用非阻塞调用， 但是非阻塞io也有一定问题， 我们并没有获取到完成的结果， 也就意味着为了知道是否读取到了
    完成的数据， 我们需要频繁的取读取数据是否完成的， 这一过程已称为 “轮训操作”。那么谁可以做轮训操作呢？
     如果是主线程去做，会大大降低性能，因为开发中不可能只是一个操作，可能是多个功能， 网络io， 数据库io。

     所以libuv提供一个线程池负责所有相关操作， 并且通过轮训方式或其他方式等待结果。当完成了线程操作获取到了结果，
      就会把对应的回调，获取的数据放入到 事件循环的某一个事件队列中，事件循环负责后续的对调工作，告诉js对应的回调函数

*/

/*
 Node端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。

常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作等。
常见的 micro-task 比如: process.nextTick、new Promise().then(回调)等。


  node中事件循环的顺序是 外部输入数据 -》 轮询阶段（poll）- 》 检查阶段（check） -关闭事件回调阶段（close callback） 
  -》定时器检查阶段（timer） -》 iI/O事件回调阶段（I/O） -》 闲置阶段（idle）-》 poll

timers: 执行setTimeout和setInterval的回调，timers阶段有几个setTimeout/setInterval都会依次执行
i/opending callbacks: 执行延迟到下一个循环迭代的 I/O 回调，系统操作（例如TCP错误类型）的回调
idle, prepare: 仅系统内部使用
poll: 检索新的 I/O 事件;执行与 I/O 相关的回调。事实上除了其他几个阶段处理的事情，其他几乎所有的异步都在这个阶段处理。
check: setImmediate在这里执行
close callbacks: 一些关闭的回调函数，如：socket.on('close', ...)


poll：
   是一个很重要的阶段：
       在这一阶段系统会 回到timer阶段执行回调
        执行i/o
    在进入这一阶段poll为空并且没有设置的timer：
       如果有setImmediate回调需要执行，poll阶段会停止并进入到check阶段执行回调
       如果没有setImmediate回调需要执行， 会等待回调被加入带队列中并立即执行， 这里有超时时间避免一直等待

    如果设定了timer且poll为空， 判断timer是否超时， 超时会回到timer执行回调

*/

/* 
  差异：
      浏览器环境中 微任务是每个宏任务执行完之后执行吗而在node中，微任务在事件循环的各个阶段之间执行，也就是
      每个阶段执行完，都会区执行微任务队列
*/