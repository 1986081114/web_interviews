/* 
   事件冒泡(event bubbling)： 事件会从最内层的元素开始发生，一直向上传播，直到document对象
   事件捕获(event capturing) ：。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。
   事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，
    从兼容性角度来说还是建议大家使用事件冒泡模型。

   addEventListener的第三个参数： 默认为 false，表示在事件冒泡阶段调用事件处理函数； true 表示在事件捕获阶段处理函数

   事件委托（代理）：只指定一个事件处理程序，就可以管理某一类型的所有事件
*/

<ul id="color-list">
    <li>red</li>
    <li>yellow</li>
    <li>blue</li>
    <li>green</li>
    <li>black</li>
    <li>white</li>
</ul>

/* 如果点击页面中的li元素，然后输出li当中的颜色，我们通常会这样写: */

(function () {
    var color_list = document.querySelector('.color-list')
    var color = color_list.getElementsByTagName('li');
    for (let i = 0; i < color.length; i++) {
        color[i].addEventListener('click', showColor, false)
    }
    function showColor(e) {
        var x = e.target;
        alert(e.innerHtml)

    }
})()

    /* 事件委托 们只绑定一个事件处理函数也可以完成： */

    (function () {
        var color_list = document.querySelector('.color-list')
        color_list.addEventListener('click', showColor, false)
        function showColor(e) {
            var x = e.target;
            if (x.nodeName.toLowerCase() === 'li') {
                alert(e.innerHtml)
            }

        }
    })()