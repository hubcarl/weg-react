/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var articleModel = require('../../model/article');

exports.article = function* article() {
  var list = yield articleModel.query(1, 20);
  this.logger.debug('list size:', list.length);
  yield this.render('demo/article', { list: list });
}

exports.react = function* react() {
  yield this.renderReact('hello', { name: "John" });
}


exports.list = function* () {
  var list = yield article.query(1, 20);
  this.logger.debug('list size:', list.length);
  yield this.render('demo/article', { list: list });
}

exports.movie = function* () {
  yield this.renderView('page/demo/movie/movie.html');
}


exports.sidebar = function* () {
  yield this.renderView('page/demo/sidebar/sidebar.html');
}


exports.single = function* () {
  yield this.renderView('page/demo/single/single.html');
}

exports.react = function* () {
  yield this.renderReact('hello', { name: "John" });
}
