
'use strict';

/** 
 * es6 http://es6.ruanyifeng.com/#docs/async
 * Description：es6使用
 * Created by sky on 16/5/12
 * Copyright (c) 2016 sky All Rights Reserved
 */
var router = require('koa-router')();
var article = require('../model/article');

// 6.1.0 support
class Point1 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Point2 {
    constructor(x, y) {
        Object.assign(this, {x, y});
    }
}

class Queue {
    constructor(contents = []) {
        this._queue = [...contents];
    }
    pop() {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
    }
}

class PeekableQueue extends Queue {
    peek() {
        return this._queue[0];
    }
}


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

    //Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
    //代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。这里暂时先不解释具体的语法,上面代码说明，Proxy实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

    var obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log(`getting ${key}!`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`setting ${key}!`);
            return Reflect.set(target, key, value, receiver);
        }
    });

    for (let c of 'foo') {
        console.log(c);
    }

    Array.from([1,2,3], x => x * x);
    Array.from([1,2,3]).map(x => x * x);
    Array.of(3, 11, 8); // [3,11,8]

    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }

    // 不支持
    //for (let elem of ['a', 'b'].values()) {
    //    console.log(elem);
    //}

    [1, 2, 3].includes(2);     // true
    [1, 2, 3].includes(4);     // false
    [1, 2, NaN].includes(NaN); // true

    //includes()：返回布尔值，表示是否找到了参数字符串。
    //startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
    //endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

    var s = 'Hello world!';
    s.startsWith('Hello') // true
    s.endsWith('!') // true
    s.includes('o') // true

    //这三个方法都支持第二个参数，表示开始搜索的位置。
    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false

    function concatenateAll(...args) {
        console.log(args.toString());
    }

    concatenateAll(1,2,3,4,5,6);


        //在 ECMAScript 6 中， {x, y} 是 {x: x, y: y} 的一种缩写形式。
    yield this.render('es6',{title:'es6学习', data:{
        source1,source2,target1,target2, copy1, copy2
    }});

});

//export default router;
module.exports=router;
