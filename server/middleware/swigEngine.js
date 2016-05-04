var path = require('path');
var swig = require('../lib/weg-swig');
var merge = require('merge');

module.exports = function (options, app) {

    options = merge({ext: 'html', layout: 'layout'}, options);

    swig.middleware(options.weg);

    app.context.render = render(options);
    app.context.renderView = renderView(options);

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

function render(options) {
    return function *render(page, locals) {
        var layout = locals.layout || options.layout;
        var filename = path.join(options.root, page.replace(/\//g, '_').replace(/\.tpl$/, '') + '.html');
        var source = `{% extends 'layout/${layout}.html' %} {% block content %} {% require $id='page/${page}' %} {% endblock %}`;
        var compiled = swig.compile(source, {filename: filename});
        var html = compiled(locals);
        return html;
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

        view = path.resolve(options.root, view);

        var data = merge(this.state, {flash: this.flash}, locals);

        this.body = yield renderFile(view, data);

        return html;
    }
}