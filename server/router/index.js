/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();

exports.init = function* () {
  yield this.render('index', {});
}
