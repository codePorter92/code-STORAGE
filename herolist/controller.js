// 引入要使用的模块
const path = require('path');
const fs = require('fs');
const template = require('art-template');
const urlModel = require('url')
const querystring = require('querystring')
// 引入自定义bindRender模块
// let bindRender = require('./bindRender.js');

// 引进自定义模块
let model = require('./model.js')

module.exports = {
    // 显示页面英雄
    showIndexPage(req, res) {
        model.getAllHero((err, data) => {
            if (err) res.end('404');
            let heroArr = JSON.parse(data);
            // let obj = {
            //     data: heroArr
            // }
            // res.render('index', obj)
            res.render('index', { data: heroArr })
        })
    },
    loadStaticSource(req, res) {
        fs.readFile(path.join(__dirname, res.pathname), "utf8", (err, data) => {
            if (err) return console.log(err.message);
            if (res.pathname.endsWith('.css')) {
                res.writeHeader(200, {
                    "Content-Type": "text/css;charset=utf-8"
                })
            }
            res.end(data)
        })
    },
    getInfoPage(req, res) {
        let urlObj = urlModel.parse(req.url, true);
        let id = urlObj.query.id;
        model.getOneHero(id, (err, data) => {
            if (err) res.end(JSON.stringify({
                code: "201",
                msg: "请求数据失败"
            }))
            res.render('info', data)
        })
    },
    getEditPage(req, res) {
        // fs.readFile(path.join(__dirname, "/views/edit.html"), "utf8", (err, data) => {
        //     if (err) return console.log(err.message);

        // })
        res.render("edit", {})
    },
    getAddPage(req, res) {
        res.render('add', {})
    },
    addheroInfo(req, res) {
        //    post方式获取数据
        let str = '';
        req.on("data", chunk => {
            str += chunk
        })

        req.on("end", () => {
            let heroInfo = querystring.parse(str)
            console.log(heroInfo)
            model.addHeroInfo(heroInfo, (result) => {
                res.writeHeader(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                })
                if (result) {
                    res.end(JSON.stringify({
                        code: "200",
                        msg: "添加成功"
                    }))
                }
                res.end(JSON.stringify({
                    code: "201",
                    msg: "添加失败"
                }))
            })
        })
    },
    getOneHero(req, res) {
        let urlObj = urlModel.parse(req.url, true);
        let id = urlObj.query.id
        model.getOneHero(id, (err, data) => {
            if (err) res.end(JSON.stringify({
                code: "201",
                msg: "获取数据失败"
            }))
            res.end(JSON.stringify({
                code: "200",
                msg: "获取数据成功",
                data: data
            }))
        })
    }
}



// 旧语法
// {
// showIndexPage:function(req,res){

// }
// }
// ECMAScript6 语法
// {
//     showIndexPage(req, res){

//     }
// }