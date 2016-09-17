
import React from 'react'

import ReactDOM from 'react-dom';

import { Panel, Table , Input, Button, Navbar} from 'react-bootstrap';

const title = (
  <h3>Panel title</h3>
);

const TableList = React.createClass({
  ItemClick : function () {
    console.log('item clicked');
  },
  render(){
    return  <div>

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
          <tr onClick={this.ItemClick}>
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
  }
});

if (typeof define == 'function') {
  ReactDOM.render(<TableList />, document.getElementById('pager'));
} else {
  module.exports = TableList;
}