//实现一个异步加法
function asyncAdd(a,b,callback){
    setTimeout(() => {
         callback(null, a+b)
    }, 500);
}

function sumT(a,b){
    return new Promise ((resolve,reject) =>{
        asyncAdd(a,b,(err,res) =>{
            if(err){
                reject(err)
            }else {
                resolve(res)
            }
        })
    })
}