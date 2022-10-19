/* 
主要是为了适配各种浏览器
*/
markyun.Event = {
    //dom2 ||id || dom0方式绑定函数
    addEvent: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler)
        }else if(element.attachEvent){
            element.attachEvent('on' + type, function(){
                handler.call(element)
            })
        }else {
            element['on' + type] = handler
        }
    },

    //移除事件
    removeEvent: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler)
        }else if(element.datachEvent){
            element.datachEvent('on' + type, handler)
        }else {
            element['on' + type] = null
        }
    },

    //阻止事件（主要是事件冒泡， 因为dom0不支持事件捕获）
    stopPropagation: function(ev){
        if(ev.stopPropagation) {
            ev.stopPropagation()
        }else {
            ev.cancelBubble = true
        }
    },
    
    //取消事件的默认行为
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault()
        }else {
            event.returnValue = false
        }
    },

    //获取时间目标
    getTarget: function(event){
        return event.target || event.srcElement
    }
   
}