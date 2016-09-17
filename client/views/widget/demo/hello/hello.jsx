import React, { Component } from 'react'
import ReactDOM from 'react-dom'

var HelloMessage = React.createClass({
    handleClick: function () {
        alert('You clicked!')
    },

    render: function () {
        return <div onClick={this.handleClick}>Hello {this.props.name}</div>
    }
});
if (typeof define == 'function') {
    ReactDOM.render(<HelloMessage name="sky"/>, document.getElementById('hello'));
} else {
    module.exports = HelloMessage;
}