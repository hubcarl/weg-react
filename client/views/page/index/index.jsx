import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { browserHistory,hashHistory, Router, Route, IndexRoute, Link } from 'react-router'

const Menu = React.createClass({
  getInitialState() {
    return {
      menuList: [{ id: 1, name: '首页', path: '/' },
        { id: 2, name: '产品中心', path: '/product' },
        { id: 3, name: '开发文档', path: '/dev' },
        { id: 4, name: '关于我们', path: '/about' }]
    }
  },
  componentWillMount() {

  },

  componentDidMount() {
  },

  componentWillUnmount() {
  },
  render(){
    const menuList = this.state.menuList.map(function (menu) {
      return <li key={menu.id}><Link activeClassName="on" to={`${menu.path}`}>{menu.name}</Link></li>
    })
    return (
      <div>
        <div className="header">
          <div className="header_content">
            <div className="left">
              <div className="logo">React</div>
            </div>
            <div className="right">
              <ul id="nav">
                {menuList}
              </ul>
            </div>
          </div>
        </div>
        <div className="content">
          {this.props.children}
        </div>
     </div>
    )
  }
})

const Index = React.createClass({
  render() {
    return <h1>React首页</h1>
  }
})

const Product = React.createClass({
  render() {
    return <h1>产品中心</h1>
  }
})


const Dev = React.createClass({
  render() {
    return <h1>开发文档</h1>
  }
})


const About = React.createClass({
  render() {
    return <h1>关于我们</h1>
  }
})

const NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={Menu}>
      <IndexRoute component={Index}/>
      <Route path="product" component={Product}/>
      <Route path="dev" component={Dev}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('menu'))
