
'use strict';

/** 
 * es6 
 * Description：es6使用
 * Created by sky on 16/5/12
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();
var article = require('../model/article');

//class Point1 {
//    constructor(x, y) {
//        this.x = x;
//        this.y = y;
//    }
//}
//
//class Point2 {
//    constructor(x, y) {
//        Object.assign(this, {x, y});
//    }
//}


router.get('/es6', function* () {

    let str='es6 study';

    str+=' happy';

    this.logger.debug(str);

    //const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError
    const source1 = {name:'carl'};
    const source2 = {birthday:'1986-01-01'};

    const target1 = Object.assign({age:28}, source1);

    const target2={};

    //多个属性复制
    [source1, source2].reduce(Object.assign, target2);

    const copy1 = Object.assign({__proto__: source1.__proto__}, source1);
    const copy2 = Object.assign({}, source1);

    //在 ECMAScript 6 中， {x, y} 是 {x: x, y: y} 的一种缩写形式。
    yield this.render('es6',{title:'es6学习', data:{
        source1,source2,target1,target2, copy1, copy2
    }});

});

module.exports=router;
