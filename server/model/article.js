//https://github.com/felixge/node-mysql
var MySQLUtil = require('../utils/mysql.js');
exports.query = function *(pageIndex, pageSize) {
  return yield MySQLUtil.query('SELECT * FROM smart_article WHERE createDate <=(' +
    'SELECT createDate FROM smart_article ORDER BY createDate desc LIMIT ?, 1) ' +
    'ORDER BY createDate desc LIMIT ' + pageSize, [(pageIndex - 1) * pageSize]);
};

exports.detail = function *(id, callback) {
  yield MySQLUtil.query('select a.*,b.content from smart_article a,smart_article_detail b WHERE a.id=b.id AND a.id=?', [id]);
};

exports.insert = function *(json, callback) {
  //var json  = {id: 1, title: 'node.js express'};
  yield MySQLUtil.query('INSERT INTO posts SET', json);
};