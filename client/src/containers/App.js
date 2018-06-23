import React,{Component} from 'react';
import Header from '../components/header';
import Landing from '../components/landing';
import Dashboard from '../components/dashboard';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect } from 'react-redux';
import * as actions from '../actions/index';
import {bindActionCreators} from 'redux';
import Background from '../images/Year-end-survey-712.png'
import NewSurveys from '../components/surveys/newSurveys.js'

class  App extends Component {
    componentDidMount() {
        this.props.currentUserAction();
    }
   render () {
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
        <div className="container" style={sectionStyle}>
            <BrowserRouter>
                <div>
                  <Header/>
                  <Route exact path ="/landing" component ={Landing} />
                  <Route exact path ="/surveys/new" component ={NewSurveys} />
                  <Route exact path ="/dashboard" component ={Dashboard} />
               </div>
            </BrowserRouter>
        </div>   
    )
   };
}
 
function mapStateToProps(state) {
    return {
      currentUser : state.AuthUser
    };
  }
function mapDispatchToProps(dispatch) {
    return bindActionCreators({currentUserAction: actions.fetchUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);