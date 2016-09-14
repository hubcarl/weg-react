/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
const router = require('koa-router')();

exports.hello = function* () {
  const reactHtml = yield this.renderComponent('hello', { name: "sky" });
  this.app.logger.debug(reactHtml);
  yield this.render('server/hello', { reactHtml: reactHtml });
}

exports.pager = function* () {
  const reactHtml = yield this.renderComponent('pager', {});
  this.app.logger.debug(reactHtml);
  yield this.render('server/pager', { reactHtml: reactHtml });
}
