var path = require('path');
var swig = require('../lib/weg-swig');
var merge = require('merge');
var React = require('react')
var ReactDOM = require('react-dom/server')

module.exports = function (options, app) {

    options = merge({ext: 'html', layout: 'layout'}, options);

    swig.middleware(options);

    app.context.render = render(options);
    app.context.renderView = renderView(options);
    app.context.renderComponent = renderComponent(options);

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


function renderComponent(options) {
    return function *renderComponent(name, data) {
        var filePath = path.join(options.root, 'client/public/widget', name, name+'.js');
        //console.log('--renderComponent filePath', filePath);
        var component = require(filePath);
        // createFactory arguments:string/ReactClass type
        var componentFactory = React.createFactory(component)(data);
        // renderToString:React.createElement
        return ReactDOM.renderToString(componentFactory);
    }
}


function render(options) {
    return function *render(page, locals) {
        var layout = locals.layout || options.layout;
        var fakePath = path.join(options.view, page.replace(/\//g, '_').replace(/\.html$/, '') + '.html');
        var source = `{% extends 'layout/${layout}.html' %} {% block content %} {% require $id='/page/${page}' %} {% endblock %}`;
        var compiled = swig.compile(source, {filename: fakePath});
        this.body = compiled(locals);
    }
}

function renderView(options) {
    function renderFile(pathName, locals) {
        return function (done) {
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

        var data = merge(this.state, {flash: this.flash}, locals);

        this.body = yield renderFile(view, data);

    }
}