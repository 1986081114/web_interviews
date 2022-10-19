import Vue from '../src/vue.js'
const vm = new Vue({
    el:'#app',
    data:{
        msg:'hello vue',
        count:100,
        testHtml:"<ul> <li>这里是v-html渲染</li></ul>"
    },
    methods:{
        handler(){
            alert(111)
        }
    }
})
console.log(vm)