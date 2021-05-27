

const obj = {
    selector: { to: { toutiao: 'FE coder' } },
    target: [1, 2, { name: 'byted' }]
};
function get (obj, ...arg){
    let res = [];
    let temp = [];
   for(let item of arg) {
    let x = (item.replace(/\[/g,'.')).replace(/\]/g,'')
    temp.push(x)  
   }
 for(let iten of temp) {
     let arr = iten.split(".")
     let val = arr.reduce((newobj, k) =>{return newobj[k]}, obj)
     res.push(val)

 }
 console.log(res)   
}

get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')
