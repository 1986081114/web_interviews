// 需要实现的函数

function repeat (func, times, wait) {

    return function(content){
        let count= 0
        let interval = setInterval(function(){
            count+=1
            func(content)
            if(count == times){
                clearInterval(interval)
            }
        },wait)
    }
   
   }
   // 使下面调用代码能正常工作
   
   const repeatFunc = repeat(console.log, 4, 3000);
   
   repeatFunc("hello world"); //会输出4次 hello world, 每次间隔3秒333


