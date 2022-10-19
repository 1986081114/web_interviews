/* npm install webpack webpack-cli -ds */
const path = require('path')

module.export = {
    
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: 'loader1'
            }
            
        ]
    },
    //loader默认解析路径， 默认去node_modules寻找。 
    resolveLoader: {
        module: [
            'node_modules',
            path.resolve(__dirname, 'loader')
        ]
    }
}