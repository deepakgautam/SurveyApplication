import React,{Component} from 'react';
import Header from '../components/header';
import Landing from '../components/landing';
import Dashboard from '../components/dashboard';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect } from 'react-redux';
import * as actions from '../actions/index';
import {bindActionCreators} from 'redux';
import NewSurveys from '../components/surveys/newSurveys.js'
import Background from '../images/Year-end-survey-712.png'

class  App extends Component {
    constructor(){
        super ();
        this.state = { windowHeight : window.innerHeight+'px'};
    }
    componentDidMount() {
        this.props.currentUserAction();
    }
    get_height() {
        return window.innerHeight;
    }
   render () {
    let height = this.state.windowHeight;
    return (
        <div className="container"  style={
            {
            width: "100%",
            height: '600px',
            backgroundImage:`url(${Background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            maxHeight: "100%",
            backgroundSize:"100% 100%"}
            }>
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