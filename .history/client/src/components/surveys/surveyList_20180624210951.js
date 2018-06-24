import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions'

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }
    renderSurveys() {
         if(typeof this.props.surveyRecord == 'undefined' ||Object.keys(obj).length === 0 && obj.constructor === Object ){
             return (<div>No Surveys Created</div>)
         } 
         return this.props.surveyRecord.map(survey =>{
           return ( <div className ="card blue-grey" key={survey._id}>
                <div className = "card-content">
                 <span className ="card-title">{survey.title}</span>
                 <p>{survey.body}</p>
                  <p className="right">
                  Sent On : {new Date(survey.dateSent).toLocaleDateString()}
                 </p>
                </div>
                <div className="card-action">
                    <a> YES : {survey.yes}</a>
                    <a>NO : {survey.no}</a>
                    <a className="right">Last Activity Date : {typeof survey.lastResponded != 'undefined'? new Date(survey.lastResponded).toLocaleDateString() : new Date(survey.dateSent).toLocaleDateString()}</a>
                </div>
            </div>
          )
        })
    }
    render(){
        return (
            <div className = "">
                {this.renderSurveys()}
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {surveyRecord : state.surveyRecord};
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList);