import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import classNames from 'classnames'

import Avatar from '../components/Avatar';
import NavFooter from './NavFooter';

import {logout} from '../actions/user';

var RenderUser = React.createClass({
  render: function(){
    const {authenticated, account} = this.props;
    var userName = '';

    if (authenticated){
      userName = account.email;
    }else{
      userName = 'Guest';
    }

    return(
      <div className="rb-user-container">
        <Avatar />
        <span>{userName}</span>
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
    const {handleClick, id} = this.props;
    handleClick(id);
  },

  render: function(){
    const {toLink, value, id, selected} = this.props;
    var classname = classNames({
      "selected": id===selected,
      "rb-nav-bar-item": true
    })

    return(
      <li
       className={classname}
       id={id}
       onClick={this.onItemClick}
       >
        <Link
         to={toLink}
         className="rb-nav-link-name"
         >{value}</Link>
      </li>
    )
  }

});



class Navigation extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      selected: -1
    }
  }

  handleClick(id){
    this.setState({
      selected: id
    })
  }


  handleLogout(){
    const {dispatch} = this.props;
    dispatch(logout());
  }
  render(){
    const nav_item = [
      {toLink: 'articles', value: '所有文章'},
      {toLink: 'article/add', value: '提交文章'}
    ]

    const handleClick = this.handleClick;
    const selected = this.state.selected;

    return (
      <div>
        <RenderUser
         authenticated={this.props.authenticated}
         account={this.props.account}
        />
        <ul className='rb-nav-list'>
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
        <NavFooter
         authenticated={this.props.authenticated}
         handleLogout={this.handleLogout}
        />
      </div>
    )
  }
}

Navigation.propTypes ={
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  account: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return{
    authenticated: state.user.authenticated,
    account: state.user.account
  }
}

export default connect(mapStateToProps)(Navigation)
