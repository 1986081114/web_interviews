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
      jsonp跨域，只能实现get一种请求方式，
      Jsonp 就是利用 <script> 标签跨域特性进行跨域数据访问。
             通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，
             在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，
             我们可以通过动态创建script，再请求一个带参网址实现跨域通信。jsonp正是利用这个特性来实现的。
             简单适用， 老式浏览器支持， 
             只能实现get请求， 不安全， 容易遭受xss攻击
            JSONP 是利用了 src 引用静态资源时不受跨域限制的机制，前端会先定义一个回调函数用来处理请求成功后的逻辑，
            并在请求服务端时告知服务端这个回调函数的名字，而服务端只需要把需要返回的数据按照 Javascript 的语法，
            放进回调函数中即可。
                 function callback(data) {
                        // 处理 data
                        console.log(data)
                    }
                    </script>
                    <script src="http://api.yoursite.com/article/all/?callbackFunc=callback"></script>
   
          2.document.domain + iframe跨域：
           此方案仅限主域相同， 子域不同的应用场景， 实现原理：两个页面都通过js强制设置documen.domain为基础主域，就实现了同域
        3.location.hash + iframe: a想和b相互通信， 通过中间页c实现， 不同域之间利用iframe的location.hash传值， 相同域之间直接js访问通信
         4.window.name+ iframe
               name值在不同页，甚至不同域名加载后依旧存在， 
         5.postMessage
         6.跨域资源共享CORS：主流的跨域解决方案
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
            非简单请求会发出一次遇检测请求，返回码204菜通过预检测， 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中
            ，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

            如： access-control-allow-origin： 它的值是请求时origin字段的值， 如果是*，标识接受任域名请求
                access-control-allow-credentials： 布尔值， 表示是否允许发送cookie，默认不包括
                access-control-request-methods： 列出浏览器请求会用到哪些方法
                access-control-request-header： 指定浏览器会额外发送的头信息字段
                access-control-allow-methods： 表示服务器支持的跨域请求方式
                access-control-max-age： 用来指本次预检查请求的有限期 


         7.nginx代理跨域：
             跨域原理： 同源策略是浏览器的安全策略， 不是http协议的一部分， 服务端调用http接口只是使用http协议们不会执行js脚本， 不需要同源策略，也就不存在跨域
             实现思路：通过nginx配置一个代理服务器（域名和domain1相同， 端口不通）做跳板机， 反向代理访问domian2，并且顺利修改cookie中的domian信息，方便将当前域的cookie写入，实现跨域登录
        8.node.js中间件代理跨域：
         node中间件实现跨域代理，域nginx相同， 都是通过启用一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite修改响应头中的cookie域名
         9.webSocket协议跨域：
          WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现

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
       加入你在某网站a买东西， 加入购物车， 这是突然有个人发了一个链接b，你点了进去。如果没有同源策略，这个网站b向着a发起了请求， 服务端验证通过后会在响应头加入set-session字段， 
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


/* ----------------------- */
//fetch  
  //fetch不是ajax的进一步封装，而是原生的js没有使用xmlhttprequest
/*
优点： 语法简洁
      基于promise实现， 支持async/await
      符合关注分离

      缺点：
        fetch不支持同步请求
        fetch只对网络请求报错，对400,500都当做成功的请求，需要封装去处理
       fetch默认不会带cookie,需要添加配置项
*/



