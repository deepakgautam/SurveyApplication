import React,{Component} from 'react';
import Background from '../images/Year-end-survey-712.png'
class  Landing  extends Component {
    constructor(){
        super ();
        this.state = { windowHeight : window.innerHeight-30px+'px'};
    }
    getStyle() {
        return  {
         width: "100%",
         height: this.state.windowHeight,
         backgroundImage:`url(${Background})`,
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
         maxHeight: "100%",
         backgroundSize:"100% 100%",
         }
    };
    render () {
        return (
         <div style ={this.getStyle()}></div> 
        )
    }
};
export default Landing;
