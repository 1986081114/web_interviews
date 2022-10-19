//运行node index.js zj age=18   主要按照空格划分参数传递的
console.log(process.argv)
console.log(process.argv[2])

process.argv.forEach(item => {
    console.log(item)
});
