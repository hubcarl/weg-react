http://www.alloyteam.com/2016/06/react-isomorphic/
ReactDOMServer 提供 renderToString 和 renderToStaticMarkup 的方法，大多数情况使用renderToString，这样会为组件增加 checksum


React 在客户端通过 checksum 判断是否需要重新render
相同则不重新render，省略创建DOM和挂载DOM的过程，接着触发 componentDidMount 等事件来处理服务端上的未尽事宜(事件绑定等)，从而加快了交互时间；不同时，组件将客户端上被重新挂载 render


renderToStaticMarkup 则不会生成与 react 相关的data-*，也不存在 checksum，输出的 html 如下


http://www.alloyteam.com/2016/06/tencent-news-react-isomorphic-straight-out-optimization/


http://ued.fanxing.com/gong-cheng-hua-zhong-de-mo-kuai-hua/


http://itbilu.com/javascript/react/N1s80lRsg.html


var jsloader = require.extensions['.js'];

require.extensions['.js'] = function(module, filename) {
  var args = [module];
  if(filename.indexOf('client/public/vendor')>-1){
    console.log(path.basename(filename));
    args.push(path.basename(filename).replace('.js',''));
  }else{
    args.push(filename);
  }
  return jsloader.apply(this, arguments);
};