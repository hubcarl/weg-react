var path = require('path');
var swig = require('../lib/weg-swig');
var merge = require('merge');
var React = require('react')
var ReactDOM = require('react-dom/server')

module.exports = function (options, app) {

    options = merge({ext: 'html', layout: 'layout'}, options);

    swig.middleware(options);

    app.context.render = render(options, app);
    app.context.renderView = renderView(options, app);
    app.context.renderReactComponent = renderReactComponent(options, app);

    return function *swigMiddleware(next) {
        var pagelets = this.query['_pagelets'];
        if (pagelets) {
            this.type = 'json';
            this.state._pagelets = pagelets;
        } else {
            this.type = 'html';
        }
        yield* next;
    };
};


function renderReactComponent(options, app) {
    return function *renderReactComponent(name, data) {
        var arr = name.split('/');
        var filePath = path.join(options.root, 'client/public/widget', name, arr[arr.length-1]+'.js');
        app.logger.debug('renderReactComponent file:', filePath);
        var component = require(filePath);
        // createFactory arguments:string/ReactClass type
        var componentFactory = React.createFactory(component)(data);
        // renderToString:React.createElement
        return ReactDOM.renderToString(componentFactory);
    }
}


function render(options, app) {
    return function *render(page, locals) {
        var layout = locals.layout || options.layout;
        var fakePath = path.join(options.view, page.replace(/\//g, '_').replace(/\.html$/, '') + '.html');
        var source = `{% extends 'layout/${layout}.html' %} {% block content %} {% require $id='/page/${page}' %} {% endblock %}`;
        var compiled = swig.compile(source, {filename: fakePath});
        Object.assign(locals, app.locals);
        this.body = compiled(locals);
    }
}

function renderView(options, app) {
    function renderFile(pathName, locals) {
        return function (done) {
            Object.assign(locals, app.locals);
            swig.renderFile(pathName, locals, done);
        };
    }

    return function *render(view, locals) {

        var ext = path.extname(view);

        if (!ext) {
            ext = '.' + options.ext;
            view += ext;
        }

        view = path.resolve(options.view, view);

        this.body = yield renderFile(view, locals);

    }
}