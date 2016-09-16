/**
 * Created by sky on 16/4/10.
 * 路由注册
 */
'use strict'
const fs = require("fs");
const path = require("path");
const xml = require('../utils/xml');
const koaRouter = require('koa-router')();

module.exports = function (app, config) {

  const routerReadyDone = app.readyCallback('requireRouter');

  xml.read(config).then(data=> {

    const rootRouter = data.RootRouter;

    rootRouter.Router.forEach(router => {

      if (router.$.use === 'false') return;

      const routerPath = path.join(config.root, router.$.path);
      const requireRouter = require(routerPath);

      if (!router.Route) router.Route = [{ '$': {} }];

      router.Route.forEach(route=> {
        const type = route.$.type || router.$.type || 'get';
        const url = path.join(router.$.prefix || '', route.$.path || '');
        const method = route.$.method;
        app.logger.debug('url:%s, requireRouter:%s', url, router.$.path);
        if (method) {
          koaRouter[type].apply(koaRouter, [url, requireRouter[method]]);
        } else {
          koaRouter[type].apply(koaRouter, [url, requireRouter]);
        }
      });
    });

    app.use(koaRouter.routes())

    routerReadyDone();
  });

  return function *(next) {
    yield next;
  };

};