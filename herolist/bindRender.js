
// 引入模块
const template = require('art-template')
const path = require('path')

function bindRender(req, res) {
    res.render = function (filename, obj) {
        let str = template(path.join(__dirname, '/views/' + filename + '.html'), obj)
        res.end(str)
    }
}

module.exports = bindRender