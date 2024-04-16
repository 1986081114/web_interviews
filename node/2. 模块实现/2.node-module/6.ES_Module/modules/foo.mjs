let name = {name: "why"};
let age = 18;
let num = 5;
const sayHello = function(name) {
  console.log("你好" + name);
}

 setTimeout(() => {
  age = 20;
 }, 1000);

/* 
 setTimeout(() => {
   console.log('foo' + num)
 }, 2000); */


setTimeout(() => {
  name.name = 'test'
 }, 1000);


 setTimeout(() => {
  console.log('foo修改后' + name.name); //bbbbb 会被修改 引用地址
  // console.log('num修改后' + num); //bbbbb 会被修改 引用地址
}, 3000); 

 
export {
  name,
  age,
  num,
  sayHello
}


