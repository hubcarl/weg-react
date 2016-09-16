import React, { Component } from 'react'
import { render, findDOMNode } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

/**
 * 图书列表组件
 */
var Books = React.createClass({
    render: function() {

        var id = this.getParams().id;
        return id ? <Book id={id} /> : (
            <div>
                <ul>
                    <li key={1}><Link to="books" params={{id: 1}}>活着</Link></li>
                    <li key={2}><Link to="books" params={{id: 2}}>挪威的森林</Link></li>
                    <li key={3}><Link to="books" params={{id: 3}}>从你的全世界走过</Link></li>
                </ul>
                //<RouteHandler />
            </div>
        );
    }
});

/**
 * 单本图书组件
 */
var Book = React.createClass({
    render: function() {
        return (
            <article>
                <h1>这里是图书 id 为 {this.props.id} 的详情介绍</h1>
            </article>
        );
    }
});

/**
 * 电影列表组件
 */
var Movies = React.createClass({

    render: function() {
        var id = this.getParams().id;
        return id ? <Movie id={id} /> : (
            <div>
                <ul>
                    <li key={1}><Link to="movies" params={{id: 1}}>煎饼侠</Link></li>
                    <li key={2}><Link to="movies" params={{id: 2}}>捉妖记</Link></li>
                    <li key={3}><Link to="movies" params={{id: 3}}>西游记之大圣归来</Link></li>
                </ul>
                <RouteHandler />
            </div>
        );
    }
});

/**
 * 单部电影组件
 */
var Movie = React.createClass({
    render: function() {
        return (
            <article>
                <h1>这里是电影 id 为 {this.props.id} 的详情介绍</h1>
            </article>
        );
    }
});






// 应用入口
var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <nav>
                    <a href="#"><Link to="movies">电影</Link></a>
                    <a href="#"><Link to="books">图书</Link></a>
                </nav>
                <section>
                    <RouteHandler />
                </section>
            </div>
        );
    }
});


// 定义页面上的路由
var routes = (
    <Route component={App}>
        <Route name="movies" path="/movies/:id?" component={Movies} />
        <Route name="books" path="/books/:id?" component={Books} />
    </Route>
);

render(routes, document.getElementById('movie'));

