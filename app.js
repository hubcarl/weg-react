/**
 * app.js
 * Description:react koa入口文件
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
'use strict'

const path = require('path');
const root = __dirname;
const koa = require('koa');
const sstatic = require('koa-static');
const parser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const swigEngine = require('./server/middleware/swigEngine');
//const router = require('./server/middleware/router');
const routerMapping = require('./server/middleware/routerMapping');
const logger = require('./server/utils/log4js').configure(root);
const xml = require('./server/utils/xml');
const co = require('co');
const app = koa();
//https://github.com/node-modules/ready-callback
const ready = require('ready-callback')();
ready.mixin(app);

app.locals = { title: 'weg-react'};
app.logger = app.context.logger = logger.getLogger('debug');

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

app.use(routerMapping(app, { root }));
app.on('error', error => {
  app.logger.error(error);
});

app.ready(function(){
  const args = process.argv.join('|');
  const port = /\-\-port\|(\d+)(?:\||$)/.test(args) ? ~~RegExp.$1 : 9999;
  app.listen(port, function () {
    app.logger.info('The server is running on port:' + port);
  });
});

