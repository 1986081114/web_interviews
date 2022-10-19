/*
 实现的webpack打包过程
   1.首先找到入口文件
   2.解析这个入口文件， 提起他的依赖
   3.解析入口文件依赖的依赖，递过去创建一个文件的依赖图， 描述所有文件的依赖关系
   4.把所有文件打包成一个文件

*/
const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
let ID = 0
const path = require('path')
const babel = require('babel-core')
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

}
function createGraph(entry) {

    const mainAsset = createAsset(entry)
    const allAsset = [mainAsset]
    for(let asset of allAsset) {
        const _dirname = path.dirname(asset.filename);
        asset.mapping = {}
        asset.dependencies.forEach(relativePath => {
            //获取所有依赖的绝对路径
           const absolutePath = path.join(_dirname,  relativePath)
            const childAsset = createAsset(absolutePath); 
            asset.mapping[relativePath] = childAsset.id
            allAsset.push(childAsset)

        })
    }
    return allAsset
}

function bundle(graph) {
    let modules = ''
    graph.forEach(module => {
        modules += `${module.id}:[
            function(require, module, exports){
                ${module.code}
            },
            ${JSON.stringify(module.mapping)}
        ],`
    })
    const result = `
          (function(modules){
              function require(id) {
                  const [fn, mapping] = modules[id];
                  function loaclRequire(relativePath) {
                      return require(mapping[relativePath]);
                  }
                  const module = {exports: {}};
                  fn(loaclRequire, module, module.exports);
                  return module.exports;
              }
              require(0)

          })({${modules}})
    `;
    return result
}
let mainAsset = createGraph('./src/entry.js')
let res = bundle(mainAsset)
console.log(res)
