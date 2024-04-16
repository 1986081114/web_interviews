/* 
 1. symbol表示独一无二的值
   保证每个属性的名称都是独一无二的,从根本上防止命名冲突
*/

// symbol()函数可以接收一个参数，表示对symbol实例的描述,这样可以区分到底哪个值
    let s1 = Symbol('foo')
    console.log(s1) // // Symbol(foo)
    
// symbol 可以转成 字符串和 布尔值，但是不能转成数值
    let sym = Symbol()
    Boolean(sym) // true
    String(sym) // 'Symbol(My symbol)'
    sym.toString() // 'Symbol(My symbol)'
    Number(sym) // TypeError
    sym.description // "foo"     description返回symbol的描述
    
// description 