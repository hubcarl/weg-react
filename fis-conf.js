//var path = require('path');
//var project = fis.project.getProjectPath().split('/').pop();
//fis.project.setTempRoot(path.join(fis.project.getTempPath(),project));

fis.project.init();

fis.set('project.ignore', ['*.iml','*.md','component.json','output/**', 'node_modules/**', '.git/**', '.svn/**']);

//设置node启动入口
fis.set('server.entry', 'app.js');

fis.log.level = fis.log.L_INFO;

//设置客户端require component组件查找目录
fis.set('component.dir','client/public/vendor');

fis.hook('commonjs',{
    //paths: {
    //    'react': 'client/public/vendor/react',
    //    'react-dom': 'client/public/vendor/react-dom'
    //}
});


//fis.unhook('components'); // fis3 中预设的是 fis-components，这里不需要，所以先关了。
//fis.hook('node_modules'); // 使用 fis3-hook-node_modules 插件。

fis.match('/{index,server,app}.js',{
    useMap:false,
    useHash: false,
    useCache:false,
    useCompile: false
});

fis.match('/server/**.**',{
    useMap:false,
    useHash: false,
    useCache:false,
    useCompile: false
});

// 编译所有后缀为 jsx 的文件为 js
fis.match('/{client/public,client/views}/(**){.jsx,:jsx}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: false
    }),
    rExt: '.js',
    isMod:true,
    useMap:true,
    useCache:false,
    url:'/public/$1',
    release: '/client/public/$1'
});

//编译所有后缀为 jsx 的文件为 js
fis.match('/client/views/widget/{hello/*,pager/*}{.jsx,:jsx}', {
    useRequireReplace:false
});


fis.match('/client/views/(**).html', {
    useMap:true,
    preprocessor: fis.plugin('extlang')
});

fis.match('/client/**.{js,css,png,jpg,gif}', {
    useHash:true
});

fis.match('/client/**.js', {
    isMod:true
});


fis.match('/client/**.{js,css}', {
    useMap:true
});

// 同名组件依赖
fis.match('/client/views/**.{tpl,js,css}', {
    useSameNameRequire: true
});


fis.match('/client/views/(**).{gif,png,js,css}', {
    url:'/public/$1',
    release: '/client/public/$1'
});

// 公共静态资源
fis.match('/{client/public, client/views}/(**).js', {
    url:'/public/$1',
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.match('/{client/public, client/views}/(**).css', {
    url:'/public/$1',
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.match('/{client/public, client/views}/(**).png', {
    url:'/public/$1',
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});


fis.match('/client/public/framework/(**).js', {
    url:'/public/framework/$1',
    isMod: false,
    wrap: false
});

fis.match('/client/public/lib/(**).js', {
    url:'/public/lib/$1',
    isMod: false,
    wrap: false
});


fis.match('::package', {
    postpackager: fis.plugin('loader',{allInOne: false})
});

fis.media('dev').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
})