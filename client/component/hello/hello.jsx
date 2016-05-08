
var React = require('react');
var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
    handleClick: function () {
        alert('You clicked!')
    },

    render: function() {
        return <div onClick={this.handleClick}>Hello {this.props.name}</div>
    }
})
if(typeof module != 'undefined'){
    module.exports = HelloMessage;
}else{
    ReactDOM.render(<HelloMessage name="John" />, document.getElementById('hello'))
}

