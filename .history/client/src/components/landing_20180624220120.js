import React,{Component} from 'react';
class  Landing  extends Component {
    return (
        <div style ={Landing}>Landing</div>
    )
}
export default Landing;

constructor(){
    super ();
    this.state = { windowHeight : window.innerHeight+'px'};
}
componentDidMount() {
    this.props.currentUserAction();
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
}