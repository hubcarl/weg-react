import React, {Component} from 'react'

import ReactDom from 'react-dom'


class List extends Component{

  constructor(props){
    super(props);
    this.state ={
      list: this.props.list
    }
  }

  render(){

    const articleList = this.state.list.map(function (item) {
      return <li key={item.id}><a href="#">{item.name}</a></li>
    })

    return (
      <ul>
        {articleList}
      </ul>
    )
  }

}

export default List