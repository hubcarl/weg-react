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

  const routerReadyDone = app.readyCallback('router');

  xml.read(config).then(data=> {

    const rootRoutes = data.RootRoutes;

    rootRoutes.Routes.forEach(routes => {

      if (routes.$.use === 'false') return;

      const routerPath = path.join(config.root, routes.$.router);
      const router = require(routerPath);

      if (!routes.Route) routes.Route = [{ '$': {} }];

      routes.Route.forEach(route=> {
        const type = route.$.type || routes.$.type || 'get';
        const url = path.join(routes.$.prefix || '', route.$.path || '');
        const method = route.$.method;
        app.logger.debug('url:%s, router:%s', url, routes.$.router);
        if (method) {
          koaRouter[type].apply(koaRouter, [url, router[method]]);
        } else {
          koaRouter[type].apply(koaRouter, [url, router]);
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