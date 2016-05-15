/**
 * Created by sky on 16/4/10.
 * 路由注册
 */
var fs = require("fs");
var path = require("path");
var caller = require('caller');
module.exports = function (app, config) {

    var dir = path.resolve(config.root, config.path||'server/route');

    var walk = function(dir){
        var dirList = fs.readdirSync(dir);
        dirList.forEach(item =>{
            var filePath = path.join(dir, item);
            if(fs.statSync(filePath).isDirectory()){
                walk(filePath);
            }else{
                //console.info('filePath:' + filePath);
                app.use(require(filePath).routes());
            }
        });
    };

    walk(dir);


    return function *(next) {
        yield *next;
    }
};