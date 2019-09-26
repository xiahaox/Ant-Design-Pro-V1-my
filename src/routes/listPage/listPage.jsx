import React from 'react';
import { connect } from 'dva';
import { Button ,List, Typography  } from 'antd';
// import PageHeaderLayout from '@/layout/PageHeaderLayout';

class listPage extends React.Component{
    
componentDidMount() {
    console.log(this.props)
    this.props.dispatch({
      type:'list/fetch',
      payload:{
        id:1,
        num:4
      }
    })
  }

  render(){
    const {data,dispatch,loading}=this.props
    const  handleAdd= ()=>{
      dispatch({
        type:'list/add',
        payload:{name: "sdfsdfsdfsd", age: 25}
      })
    }
    return (

 
      <div >
        <div>
        <Button type="primary" onClick={handleAdd}>add</Button>
          <List
            loading={loading.effects['list/fetch']}
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> 姓名：{item.name}  年龄：{item.age}
              </List.Item>
            )}
          />
        </div>
      </div>

      
    );
  }
}
  
  listPage.propTypes = {
  };
  
  export default connect(state=>{
    return { data:state.list.listData,loading:state.loading}
  }
  )(listPage);