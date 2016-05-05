/** 
 * react.js 
 * Description：mod react require alias
 * Created by sky on 16/5/4
 * Copyright (c) 2016 sky All Rights Reserved
 */
define('react', function(require, exports, module) {
    module.exports = require('../component/react/react.js');
});

define('react-dom', function(require, exports, module) {
    module.exports = require('../component/react/react-dom.js');
});

define('react-bootstrap', function(require, exports, module) {
    module.exports = require('../component/react-bootstrap/react-bootstrap.js');
});