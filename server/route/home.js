/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();
var article = require('../model/article');

router.get('/', function* () {

   var reactHtml =yield this.renderComponent('hello',{name: "John"});
   yield this.render('home',{reactHtml: reactHtml});

});

router.get('/article', function* () {
   var list = yield article.query(1,20);
   this.logger.debug('list size:', list.length);
   yield this.render('article', {list:list});
});

router.get('/movie', function* () {
   yield this.renderView('page/movie/movie.html');
});


router.get('/sidebar', function* () {
   yield this.renderView('page/sidebar/sidebar.html');
});


router.get('/single', function* () {
   yield this.renderView('page/single/single.html');
});

router.get('/react', function* () {
   yield this.renderReact('hello',{name: "John"});
});

module.exports=router;
