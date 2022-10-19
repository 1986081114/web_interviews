/* 
object.create()创建一个新的对象，使用现有的对象提供新创建对象的proto
*/
function create(proto) {
    function  F() {}
    F.prototype = proto
    return new F()
    
}