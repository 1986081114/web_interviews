过程：
  1. 新建几个js文件，构建依赖关系
  2. 编写自己的打包工具没有webpack.js 
         const content = fs.readFileSync(filename, 'utf-8')//只能读
  3. 分析ast，思考如何解析除entry.js的依赖
     File->program->body时各种语法的描述
     ImportDeclaration 的source属性 source.value就是引入文件的地址‘./message.js’
  4. 生成entry.js的ast  
        npm install babylon
 5. 获取ast内的ImportDeclaration
     npm i babel-traverse 像遍历对象一样遍历语法树
 6. 获取entry下的依赖 
    把所有依赖放入到denpendies数组统一管理
  
     ` ` `
    


```js
         const fs = require('fs')
        const babylon = require('babylon')
        const traverse = require('babel-traverse').default
        function createAsset(filename) {
        //文件的内容没有解析
        const content = fs.readFileSync(filename, 'utf-8')
        console.log(content)
        //生成ast
        const ast = babylon.parse(content, {
            sourceType: 'module'
        })
        //依赖数组
        const dependencies = []
        //查找ast下的ImportDeclaration
        traverse(ast, {
            ImportDeclaration: ({
                node
            }) => {
                dependies.push(node.source.value)
                console.log(dependencies[0])
            }
        })
    }
    createAsset('./src/entry.js')
```
` ` `
7. 优化createAsset 使其能够分区
   因为要获取所有文件的依赖，需要用唯一id标识所有的文件
   这里简单使用递增的number
   让函数输出 id, filename,  dependencies

   ` ` `
   
   ```js
     const fs = require('fs')
        const babylon = require('babylon')
        const traverse = require('babel-traverse').default
        let ID = 0
        function createAsset(filename) {
            //文件的内容没有解析
            const content = fs.readFileSync(filename, 'utf-8')
            //生成ast
            const ast = babylon.parse(content, {
                sourceType: 'module'
            })
            //依赖数组
            const dependencies = []
            //查找ast下的ImportDeclaration
            traverse(ast, {
                ImportDeclaration: ({
                    node
                }) => {
                    dependencies.push(node.source.value)
                }
            })
            const id = ID++
            return {
                id,
                filename,
             dependencies
            }
    }
    let mainAsset = createAsset('./src/entry.js')
    console.log(mainAsset)
   ```
   ` ` `
   
   8. 获取到单个依赖， 建立依赖图
   
     新增一个函数createGraph（entry），在这个函数里面调用createAsset
   
   ​    
   
   ```js
   function createGraph(entry) {
   
       const mainAsset = createAsset(entry)
       return mainAsset
   }
   ```
   
   9. 转换路径转为绝对路径
   
       有了绝对路径可以在各种环境获取到asset
       
       

```js
unction createGraph(entry) {

    const mainAsset = createAsset(entry)
    const allAsset = [mainAsset]
    for(let asset of allAsset) {
        const dirname = path.dirname(asset.filename);
        asset.dependencies.forEach(relativePath => {
            //获取所有依赖的绝对路径
            const absolutePath = path.join(dirname, relativePath)
            console.log(absolutePath)
            const childAsset = createAsset(absolutePath)
        })
    }
}
```

10. 需要一个maping  ，记录dependencies 中相对路径和 id关系，遍历所有文件

     因为后面做以来的引入，需要这样的依赖关系

    ```js
    function createGraph(entry) {
    
        const mainAsset = createAsset(entry)
        const allAsset = [mainAsset]
        for(let asset of allAsset) {
            const _dirname = path.dirname(asset.filename);
            asset.maping = {}
            asset.dependencies.forEach(relativePath => {
                //获取所有依赖的绝对路径
               const absolutePath = './' + path.join(_dirname,  relativePath)
                const childAsset = createAsset(absolutePath); 
                asset.maping[relativePath] = childAsset.id
                allAsset.push(childAsset)
    
            })
        }
        return allAsset
    }
    let mainAsset = createGraph('./src/entry.js')
    console.log(mainAsset)
    ```

      以上就是依赖图

    12. 新增bundle方法

         接收没一个module，并立即执行，所以需要立即执行函数，参数时每一个module

        ​    

        ```js
        function bundle(graph) {
            let modules = ''
            graph.forEach(module => {
                modeles += `${module.id}`
            })
            const result = `
                  (function(){
        
                  })({${modules}})
            `
        }
        ```

        

    13. 编译代码：

         npm i babel-core   npm i babel-preset-env //这个作用是编译成的格式

        ```js
        const babel = require('babel-core')
        const {code} = babel.transformFromAst(ast, null, {
                presets: ["env"]
            })
            const id = ID++
            return {
                id,
                filename,
                dependencies,
                code
            }
        
        ```

        

