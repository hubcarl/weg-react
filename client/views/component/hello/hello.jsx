var React = require('react');
var ReactDOM = require('react-dom/server');
var isNode = typeof module !== 'undefined' && module.exports;

var HelloMessage = React.createClass({
    handleClick: function () {
        alert('You clicked!')
    },

    render: function() {
        return <div onClick={this.handleClick}>Hello {this.props.name}</div>
    }
})

if (isNode) {
    module.exports = HelloMessage;
} else {
    ReactDOM.render(<HelloMessage name="John" />, document.getElementById('react-root'))
}
