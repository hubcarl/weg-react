/** 
 * app.js 
 * Description：react koa 入口文件
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var root = __dirname;
var http = require('http');
var koa = require('koa');
var sstatic = require('koa-static');
var parser = require('koa-bodyparser');
var koaLogger = require('koa-logger');
var path = require('path');
var router = require('koa-router')();
var swigEngine = require('./server/middleware/swigEngine');
var reactEngine = require('./server/middleware/reactEngine');
var logger = require('./server/utils/log4js').configure(root);

const app = koa();
app.context.logger= logger.getLogger('debug');

app.use(koaLogger ());
app.use(parser());
app.use(sstatic(path.join(root, 'client')));
app.use(swigEngine({
    root:root,
    view: root + '/client/views',
    ext: 'html',
    map: root + '/client/map.json',
    cacheMap: false,
    logger: console,
    swig: {
        cache:false, //'memory'
        filters: []
    }
},app));

app.use(reactEngine({root:root}, app));

const home = require('./server/route/home');
const es6 = require('./server/route/es6');

app.use(home.routes());
app.use(es6.routes());


app.on('error', error=> {
    console.error(error);
});


var args = process.argv.join('|');
var port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 9999;

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
