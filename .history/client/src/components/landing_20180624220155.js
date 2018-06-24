import React,{Component} from 'react';
class  Landing  extends Component {
    constructor(){
        super ();
        this.state = { windowHeight : window.innerHeight+'px'};
    }
    render () {
        
    }
}
export default Landing;


componentDidMount() {
    this.props.currentUserAction();
}
