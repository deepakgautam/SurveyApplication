import React,{Component} from 'react';
import StripCheckout from 'react-stripe-checkout';
import * as actions from '../actions';
import {bindActionCreators} from 'redux';
import {connect } from 'react-redux';


class Payments extends Component {
    render() {
        return (
            <StripCheckout
                name = "survey"
                description = "$ 5 for 500 emails"
                amount = {500}
                token = {token => this.props.handelTocken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
            <button className = "btn" sty>Add Credits</button>
            </StripCheckout>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({handelTocken: actions.handelPaymentTocken}, dispatch);
}
export default connect(null, mapDispatchToProps)(Payments);