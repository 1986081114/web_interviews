function getDate(){
    let curr = new Date()
    let year = curr.getFullYear()
    let month = curr.getMonth() + 1//因为月份0是一月
    month = month<10 ? '0' + month : month
    let day = curr.getDate()
    day = day<10 ? 0 + day: day
    let hour = curr.getHours()
    let minute = curr.getMinutes()
    let second = curr.getSeconds()
    return year + '-' +  month + "-" + day + " " + hour + ":" + minute + ":" + second
  
  }
  console.log(getDate())