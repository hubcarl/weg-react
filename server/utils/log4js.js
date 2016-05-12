var fs = require("fs");
var path = require("path");
var log4js = require("log4js");

/**
 * 调用该方法前必须确保已经configure过
 * @returns {Function|*}
 */
exports.configure = function (root) {

    var logDir = path.join(root, 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    var config = {
        "appenders": [
            {
                "type": "console"
            },
            {
                "type": "dateFile",
                "filename": path.join(root, "logs/debug"),
                "pattern": "-yyyy-MM-dd.log",
                "maxLogSize": 1024,
                "backups": 3,
                "alwaysIncludePattern": true,
                "category": "debug"
            },
            {
                "type": "dateFile",
                "filename": path.join(root, "logs/data"),
                "pattern": "-yyyy-MM-dd.log",
                "maxLogSize": 1024,
                "backups": 3,
                "alwaysIncludePattern": true,
                "category": "data"
            },
            {
                "type": "dateFile",
                "filename": path.join(root, "logs/access"),
                "pattern": "-yyyy-MM-dd.log",
                "maxLogSize": 1024,
                "backups": 3,
                "alwaysIncludePattern": true,
                "category": "access"
            }
        ]
    };

    //var config = path.join(path.resolve(__dirname, '../config'), "log4js.json");
    log4js.configure(config);
    return log4js;
}