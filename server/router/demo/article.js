/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
const articleModel = require('../../model/article');
const layout = 'bootstrap';

exports.article = function* article() {
  const list = yield articleModel.query(1, 20);
  const reactHtml = yield this.renderReactComponent('demo/article/menu', { list });
  this.app.logger.debug(reactHtml);
  yield this.render('demo/article', { layout, list, reactHtml });
}