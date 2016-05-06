/**
 * React服务器渲染
 */
var path = require('path');
var merge = require('merge');
var React = require('react')
var ReactDOM = require('react-dom/server')

module.exports = function (options, app) {

    app.context.renderReact = renderReact(options);

    return function *(next) {
        yield* next;
    };

};

function renderReact(options) {
    return function *renderReact(name, data) {
        var filePath = path.join(options.root, 'client/views/component', name, name+'.js');
        var component = require(filePath);
        var componentFactory = React.createFactory(component)(data);
        this.body = ReactDOM.renderToString(componentFactory);
    }
}
