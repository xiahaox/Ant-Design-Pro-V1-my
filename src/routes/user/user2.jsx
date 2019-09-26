import React from 'react';
import { connect } from 'dva';

class user2 extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleOuttime=()=>{
    this.props.dispatch({
      type:'user/outTime',
    })
    
  }
  render() {

    return (
      <div>    
      <h1>user2</h1>
      <a onClick={this.handleOuttime}>模仿超时</a>
      </div>
  
    );
  }
}

export default connect(()=>({}))(user2)
