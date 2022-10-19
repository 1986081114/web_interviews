function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}
console.log(validURL('https://www.baidu.com/s?ie=UTF-8&wd=%E5%9C%A8%E8%BE%93%E5%85%A5%E6%A1%86%E4%B8%AD%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%E8%BE%93%E5%85%A5%E7%9A%84%E6%98%AF%E4%B8%80%E4%B8%AA%E6%AD%A3%E7%A1%AE%E7%9A%84%E7%BD%91%E5%9D%80%20%23138'))