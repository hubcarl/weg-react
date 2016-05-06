/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();

router.get('/', function* () {

   var reactHtml = yield this.renderComponent('hello',{name: "John"});
   console.log('reactHtml', reactHtml);
   yield this.renderView('page/home/home.html',{reactHtml: reactHtml});

});

router.get('/movie', function* () {
   yield this.renderView('page/movie/movie.html');
   //this.body = "welcome koa";
});


router.get('/sidebar', function* () {
   yield this.renderView('page/sidebar/sidebar.html');
   //this.body = "welcome koa";
});


router.get('/single', function* () {
   yield this.renderView('page/single/single.html');
   //this.body = "welcome koa";
});

router.get('/react', function* () {
   yield this.renderReact('hello',{name: "John"});
});

module.exports=router;
