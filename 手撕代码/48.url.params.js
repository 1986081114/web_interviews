let url = 'http://www.domain.com/?user=anonymous&id=123tt&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

/* 
  http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#r_70732423
   一个完成的url包括： 协议部分， 域名部分， 端口部分， 虚拟目录部分， 文件名部分，参数部分， 锚部分
   协议部分： http等
   域名部分：
     顶级域名： .com
     一级域名domain.com
     二级域名：www.domain.com
  端口： 跟在域名后面的是端口  ： 分隔符，不是必须的 如果省略采用默认的
  虚拟目录部分： 也不是必须的， 域名后/开始到最后一个/
  文件名部分; 从最后一个/开始到？结束，没有？ 就到#也不是必须的
  参数部分：  从？开始到# 可以有多个参数用&作为分隔符
  锚部分：hash请求
  
// 例如当前网址是 https://juejin.im/timeline/frontend?a=10&b=10#some
console.log(location.href)  // https://juejin.im/timeline/frontend?a=10&b=10#some
console.log(location.protocol) // https:
console.log(location.pathname) // /timeline/frontend
console.log(location.search) // ?a=10&b=10
console.log(location.hash) // #some
     
*/

function parseParam(url){
    const params1 = url.split('?')[1]
    const params2 = params1.split('&')
    let paramsObj = {}
    params2.forEach(param =>{
      if(/=/.test(param)){
        let [key, val] = param.split('=')
        val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
        if (paramsObj[key]) { // 如果对象有 key，则添加一个值
          paramsObj[key] = [].concat(paramsObj[key], val);
        } else { // 如果对象没有这个 key，创建 key 并设置值
          paramsObj[key] = val;
        }
      } else { // 处理没有 value 的参数
        paramsObj[param] = true;
      }
      })
      return paramsObj
    
}

console.log(parseParam(url))


function mytrim(str){
    return str.replace(/^\s+/,"").replace(/\s+$/,"")
  }