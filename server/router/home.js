/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();
var article = require('../model/article');


exports.init = function* () {

  var reactHtml = yield this.renderComponent('hello', { name: "John" });
  this.app.logger.debug(reactHtml);
  yield this.render('home', { reactHtml: reactHtml });

}

exports.list = function* () {
  var list = yield article.query(1, 20);
  this.logger.debug('list size:', list.length);
  yield this.render('article', { list: list });
}

exports.movie = function* () {
  yield this.renderView('page/movie/movie.html');
}


exports.sidebar = function* () {
  yield this.renderView('page/sidebar/sidebar.html');
}


exports.single = function* () {
  yield this.renderView('page/single/single.html');
}

exports.react = function* () {
  yield this.renderReact('hello', { name: "John" });
}
