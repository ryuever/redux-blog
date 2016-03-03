import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import classNames from 'classnames'

import Avatar from '../components/Avatar'

var RenderUser = React.createClass({
  render: function(){
    console.log('render user');
    const {authenticated} = this.props;
    var user = '';

    console.log("user and authenticated ", authenticated, user);
    if (authenticated){
      user = '刘友超';
    }else{
      user = 'Guest';
    }

    return(
      <div className="_rb-user-container">
        <Avatar />
        <span>{user}</span>
        <span className="caret"></span>
      </div>
    )
  }
});

var RenderNavItem = React.createClass({
  /* getInitialState: function(){
     console.log("getInitialState");
     console.log('get initial : ', this.props);
     this.onItemClick = this.onItemClick.bind(this);
     }, */

  onItemClick: function(){
    console.log("on click item");
    console.log('on click item : ', this.props);
    const {handleClick, id} = this.props;
    handleClick(id);
  },

  render: function(){
    const {toLink, value, id, selected} = this.props;
    var classname = classNames({
      "selected": id===selected,
      "_rb-nav-bar-item": true
    })

    console.log("selected classname : ", classname);
    return(
      <li
       className={classname}
       id={id}
       onClick={this.onItemClick}
       >
        <Link
         to={toLink}
         className="_rb-nav-link-name"
         >{value}</Link>
      </li>
    )
  }

});



class Navigation extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      selected: -1
    }
  }

  handleClick(id){
    this.setState({
      selected: id
    })
  }

  render(){
    const nav_item = [
      {toLink: 'login', value: '登陆'},
      {toLink: 'logout', value: '登出'},
      {toLink: 'articles', value: '所有文章'},
      {toLink: 'article/add', value: '提交文章'}
    ]

    const handleClick = this.handleClick;
    const selected = this.state.selected;

    return (
      <div>
        <RenderUser authenticated={this.props.authenticated} />
        <ul className='_rb-nav-list'>
          {nav_item.map(function(item, i){
            return(
              <RenderNavItem
              key={i}
              id={i}
              toLink={'/'+item.toLink}
              value={item.value}
              handleClick={handleClick}
              selected={selected}
              />
            )
           })}
        </ul>
      </div>
    )
  }
}

Navigation.propTypes ={
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state){
  return{
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps)(Navigation)
