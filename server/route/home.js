/** 
 * home.js 
 * Description：xxxx
 * Created by sky on 16/4/24
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();
var React = require('react')

router.get('/', function* () {
   yield this.renderView('page/home/home.html');
    //this.body = "welcome koa";
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
   yield this.renderReactComponent('hello',{name: "John"});
});

module.exports=router;
