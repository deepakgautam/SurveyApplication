import '../css/navBar.css'
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect } from 'react-redux';
import Payments from './payments'
import Background from '../images/Year-end-survey-712.png'
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
  var sectionStyle = {
    width: "100%",
    height: "850px",
    backgroundImage:`url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    maxHeight: "100%",
    backgroundSize:"100% 100%",
  };
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