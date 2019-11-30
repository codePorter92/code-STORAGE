// 引入模块
const fs = require('fs');
const path = require('path');
const urlModel = require('url');
const template = require('art-template');

// 引进controller模块
let controller = require('./controller.js')


module.exports = function (req, res) {
    let method = req.method;
    let urlObj = urlModel.parse(req.url, true);
    let pathname = urlObj.pathname
    // 把pathname挂在res中
    res.pathname = pathname;
    if (method === 'GET' && (pathname === "/" || pathname === "/views/index" || pathname === "/views/index.html")) {
        controller.showIndexPage(req, res)
    } else if (method === "GET" && pathname.startsWith('/node_modules')) {
        controller.loadStaticSource(req, res)
    } else if (method === "GET" && pathname === "/views/info.html") {
        controller.getInfoPage(req, res)
    } else if (method === "GET" && pathname === "/views/edit.html") {
        controller.getEditPage(req, res)
    } else if (method === "GET" && pathname === "/views/add.html") {
        controller.getAddPage(req, res)
    } else if (method === "POST" && pathname === "/addHeroInfo") {
        controller.addheroInfo(req, res)
    } else if (method === "GET" && pathname === "/deletHeroInfo") {
        console.log(11)
        controller.deletHeroInfo(req, res)
    } else if (method === "GET" && pathname === "/getOneHero") {
        // 英雄个人数据获取的编辑
        controller.getOneHero(req, res)
    } else {
        res.writeHeader(200, {
            "Content-Type": "text/plain;charset=utf-8"
        })
        res.end(JSON.stringify({
            code: 404,
            msg: "页面不存在"
        }))
    }
}