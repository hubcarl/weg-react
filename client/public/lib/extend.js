

(typeof define=="function" ? define : function (id, callback) {callback()})("modules/android/test/test.js", function (require, exports, module) {

    var React = require("react");
    var ReactDOM = require("react-dom");

    var HelloMessage = React.createClass({
        displayName: 'HelloMessage',

        handleClick: function handleClick() {
            alert('You clicked!');
        },

        render: function render() {
            return React.createElement(
                'div',
                {onClick: this.handleClick},
                'Hello ',
                this.props.name
            );
        }
    });
    if (typeof define=="function") {
        ReactDOM.render(React.createElement(HelloMessage, {name: 'John'}), document.getElementById('hello'));
    } else {
        module.exports = HelloMessage;
    }
});


