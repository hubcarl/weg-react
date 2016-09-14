
import React from 'react'

import ReactDOM from 'react-dom';

import { Panel, Table , Input, Button, Navbar} from 'react-bootstrap';

const title = (
  <h3>Panel title</h3>
);

const tableList = (
  <div>

    <Panel header={title} bsStyle="primary">
      <Table responsive>
        <thead>
        <tr>
          <th>#</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>
      </Table>
    </Panel>
  </div>
);


var HelloMessage = React.createClass({
  handleClick: function () {
    alert('You clicked!')
  },

  render: function () {
    return <div onClick={this.handleClick}>Hello {this.props.name}</div>
  }
});
if (typeof define == 'function') {
  ReactDOM.render(tableList, document.getElementById('pager'));
} else {
  module.exports = tableList;
}