import React from 'react'

const Menu = React.createClass({
  render(){
    return (
      <div className="header">
        <div className="header_content">
          <div className="left">
            <div className="logo">React</div>
          </div>
          <div className="right">
            <ul id="nav">
              <li><a className="on" href="index.html">首页</a></li>
              <li><a href="product.html">产品中心</a></li>
              <li><a href="doc.html">开发文档</a></li>
              <li><a href="forum.html">官方论坛</a></li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
})

module.exports = Menu;
