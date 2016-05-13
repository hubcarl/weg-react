/**
 * app.js
 * Description:react koa入口文件
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
const root = __dirname;
const koa = require('koa');
const sstatic = require('koa-static');
const parser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const path = require('path');
const swigEngine = require('./server/middleware/swigEngine');
const reactEngine = require('./server/middleware/reactEngine');
const router = require('./server/middleware/router');
const logger = require('./server/utils/log4js').configure(root);

const app = koa();
app.context.logger = logger.getLogger('debug');

app.use(koaLogger());
app.use(parser());
app.use(sstatic(path.join(root, 'client')));
app.use(swigEngine({
  root: root,
  view: root + '/client/views',
  ext: 'html',
  map: root + '/client/map.json',
  cacheMap: false,
  logger: console,
  swig: {
    cache: false, // 'memory'
    filters: []
  }
}, app));

app.use(reactEngine({ root }, app));
app.use(router(app, { root }));

app.on('error', error => {
  console.error(error);
});


const args = process.argv.join('|');
const port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 9999;

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
