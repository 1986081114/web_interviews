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
  console.log('foo' + name.name); //bbbbb
}, 3000); 

 
export {
  name,
  age,
  num,
  sayHello
}


