import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './surveyForm';
import SurveyFormReview from './surveyFormReview';

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}
/**
 * suyveyForms data will be dumped once SurveyNew componete unmounted 
 * so once user will use any other route then fome  data will be cleared 
 * while if user will swith between review and  SurveyForm   the data will  persist 
 * since in SurveyForm destroyOnUnmount:  is set so on destroy of SurveyForm data will remain
 * in state 
 * 
 */
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);