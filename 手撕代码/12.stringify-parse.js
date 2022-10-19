/* 
json.parse方法解析json字符串， 构造由字符串描述的js值或者对象，提供可选择reviver函数用以返回之前那堆所得的第项执行变化
 JSON.parse(text[, reviver])
  参数
text
要被解析成 JavaScript 值的字符串，关于JSON的语法格式,请参考：JSON。
reviver 可选
转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。
返回值
Object 类型, 对应给定 JSON 文本的对象/值。
*/
/* 
JSON.stringfy() 方法将一个js对象或值转换成json字符串，，如果指定了replace函数， 则可以选择性的替换值
JSON.stringify的第二个参数是 替代者(replacer). 替代者(replacer)可以是个函数或数组，用以控制哪些值如何被转换为字符串。
如果替代者(replacer)是个 数组 ，那么就只有包含在数组中的属性将会被转化为字符串
而如果替代者(replacer)是个 函数，这个函数将被对象的每个属性都调用一遍。 函数返回的值会成为这个属性的值，最终体现在转化后的JSON字符串中

*/

// 数据类型判断
//Function都有着动态编译js代码的作用
const json = '{"result":true, "count":42}';
function ParseJsonTwo(opt) {
    return new Function("return " + opt)();
  }
  
  console.log(json)
  console.log(ParseJsonTwo(json))
  console.log(JSON.parse(json))
  /* ------------------------------------------- */
function getType(attr) {
    let type = Object.prototype.toString.call(attr);
    let newType = type.substr(8, type.length - 9);
    return newType;
  }
  // 转换函数
  function StringIfy(obj, replacer) {
    // 如果是非object类型 or null的类型直接返回 原值的String
    if (typeof obj !== "object" || getType(obj) === null) {
      return String(obj);
    }
    // 声明一个数组
    let json = [];
  
    // 判断当前传入参数是对象还是数组
    let arr = obj ? getType(obj) === "Array" : false;
    // 循环对象属性
    for (let key in obj) {
      // 判断属性是否可枚举
      if (obj.hasOwnProperty(key)) {
        // console.log(key, item);
  
        // 获取属性并且判断属性值类型
        let item = obj[key];
        // <!-------修改开始-------!>
        let flag = true;
        // 处理第二个参数
        if (replacer) {
          // 判断第二个参数类型
          switch (getType(replacer)) {
            case "Function":
              // 如果为函数执行
              flag = replacer(key, item);
              break;
            case "Array":
              // 如果为数组
              flag = replacer.indexOf(key) !== -1;
              break;
          }
        }
        // 判断返回结果
        if (!flag) {
          continue;
        }
        // <!-------修改结束-------!>
        if (item === obj) {
          console.error(new TypeError("Converting circular structure to JSON"));
          return false;
        }
        if (/Symbol|Function|Undefined/.test(getType(item))) {
          delete obj[key];
          continue;
        }
        // 如果为object类型递归调用
        if (getType(item) === "Object") {
          // consoarrle.log(item)
          item = StringIfy(item);
        }
        let DelQuetoFlag = getType(item) === "Number" || getType(item) === "Boolean" || getType(item) === "Null"
        let IsQueto = DelQuetoFlag ? "" : '"';
        // 拼接数组字段
        json.push((arr ? IsQueto : '"' + key + '": ' + (DelQuetoFlag ? '' : '"')) + String(item) + IsQueto);
      }
    }
    console.log(arr, String(json));
    // 转换数组字段为字符串
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }


  let testNull = StringIfy({ name: 111, value: null});
  console.log('testNull: ', testNull);
  let aa = StringIfy([1, 2, 4]);
  let test = {
    name: "name",
    age: undefined,
    func: function() {},
    sym: Symbol("setter")
  };
  let newTest = StringIfy(test);
  console.log(aa, newTest);
  var firstObj = {
    name: "firstObj"
  };
  firstObj.newKey = firstObj;
  StringIfy(firstObj);
  