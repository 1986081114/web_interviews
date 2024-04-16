/* ajax是一种在无需重新加载整个页面的情况下，能够更新部分网页的技术
ajax时异步js和xml的缩写
ajax的核心时XMLHttpRequest对象简称XHR， 能以异步方式从服务器获取数据， 意味着用户点击按钮，请求数据后， 可以不必刷新页面也能获取数据来更新当前页面

XMLHttpRequest（XHR）对象用于与服务器交互， 通过xhr可以在不刷新页面的情况下请求特定的url获取数据， 这允许王爷在不影响用户操作的情况下，更新页面的局部内容


跨域：
    指的是在一个域下的文档或者脚本试图去请求另一个域下的资源， 这是广义上的跨域：
       资源跳转， A链接， 重定向， 表单提交
       资源嵌入，link， script， img， frame
       脚本请求，js发起ajax， domjs对象跨域

解决跨域： 
      1.jsonp跨域，只能实现get一种请求方式，
      Jsonp 就是利用 <script> 标签跨域特性进行跨域数据访问。
             通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，
             在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，
             我们可以通过动态创建script，再请求一个带参网址实现跨域通信。jsonp正是利用这个特性来实现的。
             简单适用， 老式浏览器支持， 
             只能实现get请求， 不安全， 容易遭受xss攻击
            JSONP 是利用了 src 引用静态资源时不受跨域限制的机制，前端会先定义一个回调函数用来处理请求成功后的逻辑，
            并在请求服务端时告知服务端这个回调函数的名字，而服务端只需要把需要返回的数据按照 Javascript 的语法，
            放进回调函数中即可。
                            <script>
                    function jsonpCallback(data) {
                        console.log(data);
                    }
                </script>
                
                <!-- 负责解析字符串为 JavaScript 代码 -->
                <script src="http://localhost:3000"></script>
      
                  服务端
            const server = http.createServer((request, response) => {

                if (request.url === '/') {
                    response.writeHead(200, { 
                        'Content-Type': 'application/json;charset=utf-8' 
                    });
                    
                    // 返回一段 JavaScript 代码
                    response.end( "jsonpCallback(" + JSON.stringify(data) + ")" );
                }

            });
                   
         2.跨域资源共享CORS：主流的跨域解决方案

           浏览器限制，不一定是 限制发起跨站请求，也可能会是跨站请求正常发起，但是返回后i结果北欧浏览器拦截了
           浏览器将不同域名的内容隔绝在不同的进程中，网络进程负责下载资源并发送到渲染进城，但是由于域限制
           某些资源被阻止加载到渲染进程，通过CORB过滤恶意的返回内容（CORB是一种安全机制。防止跨域请求恶意访问跨域响应的内容）  

           跨源资源共享CORS是指一种机制，允许在受控的条件下，不同源的网络能够请求和共享资源。
           CORS 提供了一种方式来解决在 Web 应用中进行跨域数据交换的问题。

           普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：
           前后端都需要设置。需注意的是：由于同源策略的限制，所读取的cookie为跨域请求接口所在域的cookie，
           而非当前页。如果想实现当前页cookie的写入

           优缺点： 整个cors通信过程，都是浏览器自动完成， 不需要用户参与， 
                      cors和jsonp的使用目的相同， 但是更加强大， cors支持所有类型的http请求
                      jsonp的优势在于， 支持老式浏览器， 以及可以向下支持cors的网站

             浏览器将cors请求分为两类： 简单请求和非简单请求。
             满足一下就是简单请求（1）请求方式是 head get post之一
                  （2）http头信息不超过一下几种字段：
                   accept acept-language， content-language last-event-id content-type仅限于 application/x-www-form-urlencoded multipart/form-data， text/plain

            简单请求就是前端什么也不做， 如果需要携带cookie，前后端都要设置一下， 
            非简单请求(跨域)会发出一次遇检测请求，返回码204菜通过预检测， 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中
            ，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

            如： access-control-allow-origin： 它的值是请求时origin字段的值， 如果是*，标识接受任域名请求
                access-control-allow-credentials： 布尔值， 表示是否允许发送cookie，默认不包括
                access-control-request-methods： 列出浏览器请求会用到哪些方法
                access-control-request-header： 指定浏览器会额外发送的头信息字段
                access-control-allow-methods： 表示服务器支持的跨域请求方式
                access-control-max-age： 用来指本次预检查请求的有限期 


         3.nginx代理跨域：
             跨域原理： 同源策略是浏览器的安全策略， 不是http协议的一部分， 服务端调用http接口只是使用http协议们不会执行js脚本， 不需要同源策略，也就不存在跨域
             实现思路：通过nginx配置一个代理服务器（域名和domain1相同， 端口不通）做跳板机， 反向代理访问domian2，并且顺利修改cookie中的domian信息，方便将当前域的cookie写入，实现跨域登录
         4.webSocket协议跨域：
           WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，websocket和http都是引用层协议， 基于tcp， 但是websocket是一种双向通信协议。
           在建立连接后，websocket的server和client都能主动向对方发送或者接收数据。，并且在建立连接时需要http协议。

           发送方：
           let socket = new WebSocket('http://ocalhost:80')
           //// 建立 web socket 连接成功触发事件
           socket.onopen = function(){
               socket.send(';msg')//发送数据
           }
           socket.onmessage = function(e){
               console.log(e.data)//接收服务器返回的数据
           }
           // 断开 web socket 连接成功触发事件
            socket.onclose = function () {
            alert("连接已关闭...");
            };

           接收方：

           let WebSocket = require("ws");
                let wss = new WebSocket.Server({port:3000});
                wss.on("connection",function(ws){//先连接
                ws.on("message",function(data){//用message来监听客户端发来的消息
                console.log(data);//俞华
                ws.send("你好,"+data+"！");
                })
                })
      5.window.name:
          window.name这个属性不是一个简单的全局属性 --- 只要在一个window下，无论url怎么变化，只要设置好了window.name，
          那么后续就一直都不会改变，同理，在iframe中，即使url在变化，iframe中的window.name也是一个固定的值，
          利用这个，我们就可以实现跨域了。
        a页面想传递给b页面信息
         a页面设置 window.name = data

        b页面
         <iframe src="http://localhost:8088/a.html" frameborder="1"></iframe>
           inf.onload=function(){ 在onload监听
                    inf.src='http://www.test.com/b.html'       //iframe加载完成，加载www.test.com域下边的空白页b.html
                    //a页面已经被加载了，但是由于不同源不能获取到，所以利用window.name修改urlwindow.name不变，把ifranme修改成同源 ，获取值
                    console.log(inf.contentWindow.name)        //输出window.name中的数据
                    body.removeChild(inf)                      //清除iframe
                }

        6.postmessage

        7.hash：

                
ajax和jsonp区别：
    
  ajax是官方推出， 通过xhr去实现， jsonp利用scrip标签实现
  ajax是一个异步请求， jsonp是一个同步请求
  ajax存在同源检查， jsonp是一个同步检查
  ajax支持各种检查， jsonp只支持get请求
  

CSP: n内容安全策略， 为了页面内容安全而制定的一系列防护策略，通过cps所约束的规则指定可信的内容来源。
     本质是建立一个白名单， 告诉浏览器那些外部资源可以加载，那些要被拦截。
     通常有两种方式来开启 CSP，一种是设置 HTTP 首部中的 Content-Security-Policy，一种是设置 meta 标签的方式：<meta http-equiv="Content-Security-Policy">
      Content-Security-Policy: <policy-directive>; <policy-directive
     

同源策略： 
        origin： web内容的源由用于访问它的url的协议  主机域名 端口定义。 只有当方案 主机 端口都匹配时两个对象具有相同的起源

        浏览器同源策略：导致跨域
            同源策略是一个非常重要的安全策略， 它用于限制一个origin的文档或者它加载的脚本如何能与另一个源的资源进行交互，
            他能帮助阻挡恶意文档， 减少可能被攻击的媒介

        同源的定义：  如果两个url的协议， 端口号， 和域名都相同的话，那么这两个url是同源的

        同源策略限制以下几种行为：

            1.) Cookie、LocalStorage 和 IndexDB 无法读取
            2.) DOM 和 Js对象无法获得
            3.) AJAX 请求不能发送

    
    如果没有同源策略限制的接口请求：
       加入你在某网站a买东西， 加入购物车， 这是突然有个人发了一个链接b，你点了进去。如果没有同源策略，这个网站b向着a发起了请求，
        服务端验证通过后会在响应头加入set-session字段， 
         然后下次在发送请求的时候，浏览器会自动将cookie附加在http请求的头字段， cookie中， 这样就相当于b登陆了你的账号，进行操作了
          如果这是银行账号呢？
          浏览器可以设置httponly，是的前端无法操作cookie，有了这样的操作， 像xss攻击就无法获取到了， 设置secure，保证 https的加密通信在传输中无法被截获

        function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin") */


/* 3.ajax,fetch, axios区别：

 所以其主要区别是 axios、fetch请求后都支持Promise对象API，ajax只能用回调函数，
               ajax和axios都是基于xhr实现的请求，而fetch脱离xhr，fetch本身就是js的diceng

   ajax js执行异步网络请求，而不像需要重新加载刷新整个页面， ajax使用XMLHttpRequest对象获取数据， 然后通过dom将新数据插入到页面中，
       ajax通信与数据格式无关， 这种技术就是无须刷新页面即可从服务器获取数据， 但不一定是xml。
       对于ie7+和其余浏览器可以直接使用xmlhttprequest对象， 对于ie6及以前的浏览器， 使用ActiveXObject对象 */
/*  Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
  服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
  所有版本的 IE 均不支持原生 Fetch
*/

/*    缺点：
   、针对MVC的编程，不符合前端MVVM的浪潮

     2、基于原生XHR开发，而XHR本身的架构不清晰 （我觉得此处应该是说官方给出的文档架构不清晰。）
   
     3、JQuery整个项目太大，单纯使用Ajax 却要引入整个JQuery，非常的不合理（采取个性化打包的方案又不能享受CDN服务）
   
     4、不符合关注分离（Separation of Concerns）的原则 */
var xhr;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
}
xhr.open(mothed, url, boolean)  //请求方法， 路径， boolean是否异步 默认true 异步
xhr.send(data)   //send方法接受一个参数，即作为请求主体发送的数据（post方法啊会用， get方法直接传null），
//xmlhttprequest异步  请求：
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {//请求成功
        if (ShadowRoot.status === 200) {
            console.log(xhr.responseText)//responseText拿到样本
        } else {
            console.log(xhr.status)
        }
    } else {
        //其余http请求
        /* 
        xhr的属性含义如下：

    responseText: 作为响应主体被返回的文本。
    
    responseXML: 如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保存响应数据的 XML DOM 文档。
    
    status: 响应的 HTTP 状态。
    
    statusText: HTTP 状态的说明。
    
    readyState ：表示请求/响应过程的当前活动阶段。可取值如下。
    
    0: 未初始化。尚未调用 open()方法。
    
    1: 启动。已经调用 open()方法，但尚未调用 send()方法。
    
    2: 发送。已经调用 send()方法，但尚未接收到响应。
    
    3: 接收。已经接收到部分响应数据。
    
    4: 完成。已经接收到全部响应数据，而且已经可以在客户端使用了。
    
    只要 readyState 属性的值由一个值变成另一个值，都会触发一次 readystatechange 事件。
    可以利用这个事件来检测每次状态变化后readyState 的值。通常，我们只对 readyState 值为 4 的阶段感兴趣，
    因为这时所有数据都已经就绪。不过，必须在调用 open()之前指定 onreadystatechange事件处理程序才能确保跨浏览器兼容性。
    
    另外，在接收到响应之前还可以调用 abort()方法来取消异步请求:
    
    xhr.abort();
    
    调用这个方法后，XHR 对象会停止触发事件，而且也不再允许访问任何与响应有关的对象属性。在终止请求之后，
    还应该对 XHR 对象进行解引用操作。由于内存原因，不建议重用 XHR 对象。
                */
    }
}


//axios
/* axios也是对原生xhr的一种封装，不过是promise的实现版本 
      特征：  从浏览器创建xmlhttprequest
              支持promise api
              客户端放置csrf
              提供并发请求接口
              拦截请求和响应数据
              取消请求
              自动转换json数据
      防止csrf： 就是每个请求都带一个从cookie中拿到的key，根据浏览器同源策略，假冒的网站拿不到key，这样后台可以轻松辨别请求的出处，采取正确措施
  axios默认content-type是application/json
 
*/
// 第一种写法get
axios.get('/user?id=12345&name=xiaoming')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

// 第二种写法
axios.get('/user', {
    params: {
        id: '12345',
        name: 'xiaoming'
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
//POST 注意post用data，get用params
axios({
    url: '/user',
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        id: '12345',
        name: 'xiaoming'
    }
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

//多个并发请求
axios.all().then([getUserAccount(), getUserPermissions()])
//创建实例
const instance = axios.create({
    baseURL: url,
    timeout: 50000
});
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
}, function (error) {
    // 对请求错误做些什么
})
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
    }, function (error) {
        // 对响应错误做点什么
    })

///可以在稍后移除拦截器： eject

var myInterceptor = axios.interceptors.request.use(function () {/*...*/ });
axios.interceptors.request.eject(myInterceptor);

jqoery的contenttype默认是application / x - www - form - urlencode
axios的contenttype默认是application / json

/*
axios可以使用CancelToken函数取消请求
axios.cancelToken(function(c) {
    //c就是取消请求的函数
    cancel = c
})
//只要在别的环境执行cancel()就可以取消请求了
*/


/* ----------------------- */
//fetch  
  //fetch不是ajax的进一步封装，而是原生的js没有使用xmlhttprequest
/*
优点： 语法简洁
      基于promise实现， 支持async/await
      符合关注分离(关注分离是一种程序设计时的思考方式，也是一种设计原则。它告诉我们，在遇到问题时，不要一味堆叠，杂乱无章，
                 而应该是从问题的不同侧面，不同角度，对问题进行合理的拆解，从而达到清明明确的处理问题的目标。这就是关注分离。)

      缺点：
        fetch不支持同步请求
        fetch只对网络请求报错，对400,500都当做成功的请求，需要封装去处理
       fetch默认不会带cookie,需要添加配置项

    try{
        const  response = await fetch('url')
        const data = awaitresponse.json()
        console.log(data)

    }.catch(error){
        console.log(error)
    }
*/



