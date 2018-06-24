import React,{Component} from 'react';
class  Landing  extends Component {
    constructor(){
        super ();
        this.state = { windowHeight : window.innerHeight+'px'};
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
         marginTop : '64px'
         }
    };
    render () {
        
        return (
         <div style ={this.getStyle()}></div> 
        )
    }
}
export default Landing;


componentDidMount() {
    this.props.currentUserAction();
}
