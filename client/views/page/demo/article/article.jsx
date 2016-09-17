import React from 'react'

import ReactDOM from 'react-dom'

import TabMenu from '../../../widget/demo/article/menu'

module.exports = function (list) {
  ReactDOM.render(<TabMenu list={list}/>, document.getElementById('article'));
}