import React from 'react'

import ReactDOM from 'react-dom'

import {Tabs, Tab} from 'react-bootstrap'

import List from 'client/views/widget/demo/article'


class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.selectTab = this.selectTab.bind(this);
    this.state = {
      key: 1
    }
  }


  selectTab(key) {
    alert('selected ' + key);
    this.setState({ key });
  }

  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.selectTab} id="controlled-tab-example">
        <Tab eventKey={1} title="Tab 1"><List /></Tab>
        <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
        <Tab eventKey={3} title="Tab 3">Tab 3 content</Tab>
      </Tabs>
    );
  }

}

ReactDOM.render(<TabMenu />, document.getElementById('article'));