const path = require('path');

// 1.获取路径的信息
const filepath = '/User/why/abc.txt';
console.log(path.dirname(filepath))// /user/why
console.log(path.basename(filepath))//abc.txt
console.log(path.extname(filepath))//.txt



// 2.join路径拼接 path.join() 方法使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
const basepath = 'User/why';
const filename = 'abc.txt';


const filepath1 = path.join(basepath, filename);
console.log(filepath1);

// 3.resolve路径拼接 路径或路径片段的序列解析为绝对路径

const filepath2 = path.resolve(basepath, filename);//E:\web_interviews\node\3.常见的内置模块\3.1.path\User\why\abc.txt
 console.log(filepath2);
// resolve会判断拼接的路径字符串中,是否有以/或./或../开头的路径
 //../  E:\web_interviews\node\3.常见的内置模块\User\why\abc.txt  找到上一层才开始拼接 ，所以没有\3.1path
 // ./  E:\web_interviews\node\3.常见的内置模块\3.1.path\User\why\abc.txt
 // /   E:\User\why\abc.txt
 //     E:\web_interviews\node\3.常见的内置模块\3.1.path\User\why\abc.txt


//当第二个有./ ../ / 的时候
const basepath2 = '/User/coderwhy';
//const filename2 = '/why/abc.txt'; //     E:\why\abc.txt
//const filename2 = './why/abc.txt'; //    E:\User\coderwhy\why\abc.txt
//const filename2 = 'why/abc.txt'; //      E:\User\coderwhy\why\abc.txt
//const filename2 = '../why/abc.txt'; //   E:\User\why\abc.txt

const result = path.resolve(basepath2, filename2);
console.log(result);

