import React from 'react';
import {connect} from 'dva'
import { Menu, Dropdown, Icon ,Avatar} from 'antd';
import style from'./index.less'
function GlobalHeader  (props) {
    console.log(props,'GlobalHeader');
    const {user,dispatch,collapsed,onCollapse}=props
    
    const handleMenuClick = e => {
      if (e.key === 'logout') {
        dispatch({
          type: 'user/logout'  
        })
      }
    };
    const menu = (  
        <Menu  onClick={handleMenuClick}>
          <Menu.Item key='logout'>
            <a>退出</a>
          </Menu.Item>
          <Menu.Item key='11'>
            <a>修改密码</a>
          </Menu.Item>
        </Menu>
      );

   const toggle = () => {
    onCollapse(!collapsed)
  };     
  return (
    <div>
      <div>
          <Icon
              className={style.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
          <Dropdown overlay={menu} className={style.right}>
            <a className="ant-dropdown-link" >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            {user}
            <Icon type="down" />
            </a>
         </Dropdown>
      </div>
    </div>
  );
};

const mapStateToProps=(state)=>{
 return {...state.user}
}

export default connect(
  mapStateToProps
)(GlobalHeader)
 