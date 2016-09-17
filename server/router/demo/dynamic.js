/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */

exports.react = function* react() {
  yield this.renderReact('hello', { name: "John" });
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
