/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var articleModel = require('../model/article');

exports.article = function* article() {
  var list = yield articleModel.query(1, 20);
  this.logger.debug('list size:', list.length);
  yield this.render('article', { list: list });
}

exports.react = function* react() {
  yield this.renderReact('hello', { name: "John" });
}

