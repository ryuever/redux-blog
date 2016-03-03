import React, {Component, PropTypes} from "react";
import {Link} from 'react-router';

class Home extends Component{

  render(){
    var divStyle = {
      backgroundImage: 'url(/background-cover.jpg)'
    };

    return(
      <div
       className="_rb-panel-cover"
       style={divStyle}
       >
       <div className="_rb-panel-main">
         <div className="_rb-panel-inner">
           <div className="_rb-panel-content">
             <h1> vision seeker </h1>
             <div className="_rb-panel-navi">
               <Link to="articles" className="btn"> 欢迎进入小站 </Link>
             </div>
           </div>
         </div>

       </div>
     </div>
    )
  }
}

export default Home
