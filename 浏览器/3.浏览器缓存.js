/* 缓存过程分析： 浏览器与服务器通信的方式为应答方式，即浏览器发起http请求-服务器响应该请求，
那么浏览器第一次向服务器发起请求拿到结果会根据响应报文http的缓存标识，决定缓存结果

如果全部使用强缓存，那么如果做了版本更新， 也不会替代，但是如果用协商缓存， 每次都去请求也浪费资源
所以可以采用折中， 在打包的时候，把静态资源的名称+hash改变
之后 html使用协商缓存
    css js 图片使用 强缓存， 文件名都带上hash值


缓存优点： 加快页面打开速度
          减轻服务器压力
          减少网络损耗

缓存方式： 强制缓存， 协商缓存
   强制缓存优先级高于协商缓存
     强制缓存：文件从缓存中获取，不需要发送请求
     协商缓存：文件已经被缓存，但是否从缓存中读取是需要和服务器进行协商
               具体如何协商要看请求头/响应头字段设置，注意协商请求还是发送了请求

强制缓存：
    强制缓存在http1.0的时候用的Expires，在响应头里面的一个字段表示的是文件过期时间，是绝对时间，
    正因为是绝对时间所以在某些某些情况下，服务器的时区不一致的时候就会导致缓存失效。
     为了解决这个问题，http1.1引入新的响应头 cache-control 优先级高于expires
    cache-control：
            max-age：最大缓存时间，相对时间秒 
            public：表示客户端和代理服务器都会缓存
            private：表示只有客户端会缓存
            no-cache：协商缓存标识符 经常变化的资源
            no-store：文件不会缓存
            s-maxage:针对代理服务器的缓存时间

当强缓存时间超时了， 就到了协商缓存了。
协商缓存：
   协商缓存利用Last-Modified/if-modified-Sice， Etag/ if-None-Match这两对请求头
    Last-Modified/if-Modified-Since 
        浏览器第一次发送请求，获取文件缓存下来，服务器返回后Last-Modified，记录被更改时间。
        浏览器第二次发送请求时会带上if-Modified-Since 时间就是Last-Modified返回的值，然后服务器拿到这个字段和内部时间对比
        时间形同便是没有修改，返回304从缓存获取文件，协商缓存失效返回200，从新请求资源

    Etag/If-None-Match：
       由于Last-Modified的时间颗粒是秒，有的文件在1s内更改很多次，这种方式方式在这种特殊情况下还会失效，
       所以http1.1引入Etag，这个字段是根据内容生成一个标记符，然后和if-None-Match进行对比就更加准确知道是否更改
       Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，
       If-None-Match是客户端再次发起该请求时，携带上次请求返回的唯一标识Etag值，通过此字段值告诉服务器该资源上次请求返回的
         唯一标识值。服务器收到该请求后，发现该请求头中含有If-None-Match，则会根据If-None-Match的字段值与该资源在服务器的Etag值
      做对比，一致则返回304，代表资源无更新，继续使用缓存文件；不一致则重新返回资源文件，状态码为200

       精确上etag高于last-Modified ：
          由于lastModified感知时间是秒， 如果在一秒内改变多次， 这时候就失效了。
          还有就是如果编辑了文件，但是内容并没有改变， 也会失效。
       性能上 last-Modifird-since优于etag
          因为last-modified仅仅记录一个时间点， etag需要根据文件具体内容生成hash
        优先级：服务器优先考虑etag。

      对于一些频繁变动的资源，可以使用cache-control： no-cache，配合etag使用，表示资源已经缓存但是每次还是判断是否已经更新
      对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件


缓存地址：
    Service Worker ， dist cache， memeory cache ，Push Cache

     memory cache： 缓存在内存里，优点是快，具有时效性，关闭tab就会失效
     dist cache： 缓存在磁盘里，慢但还是比请求快，优点是一直被保存，

   Service Worker是运行在浏览器背后的独立线程，一般可以实现离线缓存， 消息推送， 网络代理。
    使用Service Worker传输协议必须是Https协议，因为Service Worker涉及请求拦截， 
       他与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存那些文件，如何匹配缓存，如何请求缓存，并且缓存时持续性的
       Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，
       那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。
      当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，
      会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。

 
    大一点的文件缓存在dist，因为内存地址有限，磁盘空间大
    小一点的文件js，图片存在memory
    css一般存在dist
    特殊情况下memory大小有限，浏览器会根据自己内置算法，将一部分js'存在dist里面。

Push cache：  
    时http/2的内容，当以上三种缓存都没有被命中，他才会被使用，他只在会话（session）中存在，一旦会话结束就被释放，缓存事件短暂
    所有资源都可以被缓存， 
    可以推送no-cache， no-store的资源
    一旦关闭连接，就被释放

用户行为影响：
   打开网页，地址栏输入地址，查找dist cache 是否匹配。如果没有发送请求。
   普通刷新（F5）： 因为tab没有关闭 memory cache优先使用其次才是 dist cache
   强制刷新（ctrl + f5），浏览器不使用缓存，请求头带有cache-control： no-cache，返回200，请求资源



//---------------------------------------------------------

浏览器本地缓存：
主要分为： cookie， IndexDB, WebStorage(loclStorage, sessionStorage);

   
document.cookie = '名字=值';
document.cookie = 'username=cfangxu;domain=baike.baidu.com'    //并且设置了生效域
得到数据var x = document.cookie;



localStorage和sessionStorage使用相同的api，尽在客户端浏览器存储，只针对同一个域名，
localStorage.setItem("key","value");	//以“key”为名称存储一个值“value”； 字符串类型

localStorage.getItem("key");	//获取名称为“key”的值

localStorage.removeItem("key");	//删除名称为“key”的信息。

localStorage.clear();	//清空localStorage中所有信息
只有相同域名的页面才能互相读取 localStorage，sessionStorage，同源策略与 cookie 一致
唯一的不同就是： localStorage理论上永久有效，除非用户清理
可以通过 window.addEventListener('storage', function) 监听 storage事件
        
        
sessionStorage仅在当前会话有效， 如果页面会话session结束（关闭窗口），就会消失
三者异同：
    webstorage 提供了一种 不首页面刷新影响而存储数据的两种方式。
   1.生命周期
      cookie，可以设置失效时间，没有设置浏览器关闭就失效
      localStorage理论上永久有效，除非用户清理
      sessionStorage仅在当前会话有效， 如果页面会话session结束（关闭窗口），就会消失
   2.存储数据大小：
     cookie 4kb左右
     localStorage和sessionStorage可以保存5mb
  3.http请求：
     cookie每次都会被携带在http中， 如果使用cookie保存数据过多，会带来性能问题
     localStorage和sessionStorage进保存在客户端， 不参与服务器通信
   4.用途， cookie，服务器生成一般用来生成身份并不是很适合存储，其余两个存储数据的
   5. 他们都只针对一个域名，即在同一个域名下使用
   6. 安全性： Cookie 的安全性较低,因为 Cookie 在每次 HTTP 请求中都会自动发送到服务器,存在被窃取或篡改的风险。
        而 LocalStorage 的数据仅在浏览器端存储,不会自动发送到服务器,相对而言更安全一些;

   IndexedDB： 
      是运行在浏览器中的非关系型数据库， 理论上容量没有上限。 
        键值对存储， 内部采用对象仓库存放数据。 
        异步操作， 数据库的读写属于i/o操作， 浏览器对异步i/o提供了支持。
        受同源策略的影响， 无法访问跨域的数据库 */

   //清除缓存
/*        1. <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
          <META HTTP-EQUIV="expires" CONTENT="0">
       2.ajax请求清除：
            xmlHttp.setRequestHeader("If-Modified-Since","0"); 
            xmlHttp.setRequestHeader("Cache-Control","no-cache");

      3.在请求路径加上随机数
        URL 参数后加上 "?ran=" + Math.random(); //当然这里参数 ran可以任意取了
 */

// indexedDB 使用：

  // 浏览器对于indexDB有些不同，会有前缀， 所以需要类型转换
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
// 从数据库某个特定key rang中取出数据
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  // open返回一个请求对象， 这个是异步操作， open并不会立即打开数据库或事物， 而是通过监听request事件来处理
  // open方法传入两个参数， 数据库名成和数据库版本号。
  let request = window.indexedDB.open('MyTestDatabase', 3);

  request.onupgradeneeded = function(event) {
   let db = event.target.result;
   let objectStore = db.createObjectStore('name', {keyPath: 'myKey'});
  }
