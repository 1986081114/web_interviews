/* 

dns的作用就是通过域名查询到具体的IP
   当你在浏览器访问www.google.com
      1.本地客户端向服务器发起请求查询ip地址
      2.查看浏览器有没有该域名的ip缓存
      3.查看操作系统有没有该域名的缓存
      4.查看host文件有没有该域名的解析配置
      4.5去路由器查看是否有缓存
      5.如果都没有，会直接去dns根服务器其查询， 这一步负责查询com这个一级域名的服务器。
      6.然后去查询goofle.com这个二级域名
      7.接下来查询www.google.com这个三级域名
      8.返回dns客户端并缓存。

      DNS域名系统，是应用层协议，运行UDP协议之上，使用端口43
一般向本地DNS服务器发送请求是递归查询的
本地 DNS 服务器向其他域名服务器请求的过程是迭代查询的过程👇
递归查询和迭代查询

递归查询指的是查询请求发出后，域名服务器代为向下一级域名服务器发出请求，最后向用户返回查询的最终结果。
使用递归 查询，用户只需要发出一次查询请求。
迭代查询指的是查询请求后，域名服务器返回单次查询的结果。下一级的查询由用户自己请求。使用迭代查询，用户需要发出 多次的查询请求。

所以一般而言，本地服务器查询是递归查询，而本地 DNS 服务器向其他域名服务器请求的过程是迭代查询的过程


DNS 为什么使用 UDP 协议作为传输层协议？
DNS 使用 UDP 协议作为传输层协议的主要原因是为了避免使用 TCP 协议时造成的连接时延
为了得到一个域名的 IP 地址，往往会向多个域名服务器查询，如果使用 TCP 协议，那么每次请求都会存在连接时延，这样使 DNS 服务变得很慢。
大多数的地址查询请求，都是浏览器请求页面时发出的，这样会造成网页的等待时间过长。

DNS预取技术：
   他的主要思想就是利用现有的dns机制，提前解析网页中可能的网络连接，具体来讲就是当用户正在浏览当前网页的时候，提取出网页的超链接，将域名抽取
   利用比较少的cpu和网络带宽解析域名或IP地址，这个过程用户无法感知，但是当用户点击链接时，却可以减少加载时间，特别在域名解析比较慢的时候，效果明显。
   dns预取技术针对多个域名采取并行处理的方式，每个域名的解析由新开启的线程处理，结束后线程退出。浏览器使用追踪技术获取用户从什么网页跳转到另一个网页，
   可以利用这些技术，一些启发式规则的其它一些暗示来预测用户下一步的操作，当有足够把握是，先获取dns预取，更进一步建立tcp链接。
*/