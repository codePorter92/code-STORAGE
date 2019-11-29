// 引入需要的模块
const http = require('http');
const fs = require('fs');
// const path = require('path');
// const urlModel = require('url');
const queryString = require('querystring')
// const template = require('art-template')

// 引入自定义模块
let bindRender = require('./bindRender.js')
// 引进路由模块
let router = require('./router.js')
// console.dir(bindRender)
// 建立通信通道
let app = http.createServer();

app.listen(3016, () => {
    console.log('app is running at http://127.0.0.1:3016');
})

app.on('request', (req, res) => {
    // 引入bindRender模块，因为这模块打印出来的是function
    bindRender(req, res)

    router(req, res)
})
