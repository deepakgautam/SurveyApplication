import '../css/navBar.css'
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import Payments from './payments'
class  Header extends Component { 
  renderHeader() {
    switch(this.props.AuthUser) {
      case null:
        return ;
        break;
      case false:
      return   <li><a href="auth/google">Login With Google</a></li>;
      default :
      return  [
               <li key="1"><Payments/></li>,
               <li key = "2" style= {{"margin":"0 10px"}}>Credit {this.props.AuthUser.credit}</li>,
               <li key="2"><a href="api/logout">Logout</a></li>
              ];
    }
 }
 render(){
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
           to ={this.props.AuthUser ? '/surveys' : '/'}
           className="left brand-logo"><img src={require('../images/logo2.jpg')}
            style ={{maxHeight:70, maxWidth:70, margin:10}}/>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderHeader()}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    AuthUser : state.AuthUser
  };
}
export default connect(mapStateToProps)(Header);