/** 
 * xml 
 * Description：xxxx
 * Created by sky on 16/5/21
 * Copyright (c) 2016 sky All Rights Reserved
 */
var xml2js = require('xml2js');
const path = require("path");
const fs = require("fs");

exports.read = function (config) {
  const routeXmlPath = path.resolve(config.root, config.path || 'server/config/route.xml');
  const xml = fs.readFileSync(routeXmlPath);
  return new Promise((resolve, reject)=> {
    xml2js.parseString(xml, (err, result)=> {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

}
