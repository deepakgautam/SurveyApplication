import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header';
import Landing from '../components/landing';
import Surveys from '../components/surveys';
import Dashboard from '../components/dashboard';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect } from 'react-redux';
import * as actions from '../actions/index';
import {bindActionCreators} from 'redux';
 

class  App extends Component {
    componentDidMount() {
        this.props.currentUserAction();
    }
   render () {
    return (
        <div className="container">
            <BrowserRouter>
               <div>
                  <Header/>
                  <Route exact path ="/landing" component ={Landing} />
                  <Route exact path ="/surveys" component ={Surveys} />
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