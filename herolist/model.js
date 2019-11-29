// 引入需要的模块
const fs = require('fs');
const path = require('path')
// 引进第三方模块moment
const moment = require('moment')

module.exports = {
    getAllHero(callback) {
        fs.readFile(path.join(__dirname, "/hero.json"), 'utf8', (err, data) => {
            if (err) return callback(err)
            callback(null, data)
        })
    },
    getOneHero(id, callback) {
        fs.readFile(path.join(__dirname, '/hero.json'), "utf8", (err, data) => {
            if (err) return callback(err);

            // console.log(typeof id, id)

            let heroArr = JSON.parse(data)
            let obj;
            heroArr.some(item => {
                if (id == item.id) {
                    obj = item
                }
            });
            // console.log(obj)
            callback(null, obj)
        })
    },
    addHeroInfo(heroInfo, callback) {
        fs.readFile(path.join(__dirname, '/hero.json'), "utf8", (err, data) => {
            if (err) return callback(false);
            let heroArr = JSON.parse(data);
            // 给新添加的英雄信息添加id
            heroInfo.id = +heroArr[heroArr.length - 1].id + 1;
            // moment模块的第三方格式方法，通过查看官网找到的
            heroInfo.date = moment().format('YYYY-MM-DD hh:mm:ss')
            console.log(heroInfo)
            heroArr.push(heroInfo)
            fs.writeFile(path.join(__dirname, "/hero.json"), JSON.stringify(heroArr), err => {
                if (err) return console.log(err);
                callback(true)
            })
        })
    }
}