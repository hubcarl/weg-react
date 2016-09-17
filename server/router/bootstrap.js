/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
const router = require('koa-router')();
const layout = 'bootstrap';

exports.pager = function* () {
  const reactHtml = yield this.renderReactComponent('bootstrap/pager', {});
  this.app.logger.debug(reactHtml);
  yield this.render('bootstrap/pager', { layout, reactHtml });
}
