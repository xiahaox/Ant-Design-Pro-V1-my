import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon ,Spin } from 'antd'
import { Link, Redirect, Route, Switch, } from 'dva/router';
import { getMenu, getRouter,getOpenKeys } from '../utils/utils'
import menuData from '../common/menu'
import NotFound from '../routes/error/404'
import GlobalHeader from '../components/GlobalHeader'
import SiderMenu from '../components/SiderMenu/index';
import logo from '@/assets/logo.svg'
import { log, logger } from 'handlebars';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class layoutDom extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    this.state = {
      openKeys: [],
      collapsed: false,
    };
  }
  handleMenuCollapse = collapsed => {
    console.log(collapsed);
    
    this.setState({ collapsed });
  };

  componentWillMount () {
    console.log('componentWillMount');
    const { dispatch,user,history} =this.props
    dispatch({
      type: 'user/getUserInfo'  
    })
  };
  componentDidMount () {
    console.log('componentDidMount');
    const { dispatch,user,location,routeData} =this.props
    // console.log(this.props);
    

  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps',nextProps);
  }
  getMenuData =(privileges)=>{
   return privileges.length==0?[]:getMenu(menuData,privileges)
  }

  render () {
    const {  routeData ,privileges,user,history,loading,location} = this.props
    const islogin=sessionStorage.getItem('token')
    // const openKeys=this.state.openKeys.length>0?this.state.openKeys:[location.pathname]
    const {openKeys}=this.state
    console.log('renser',this.props);
    console.log(privileges);
    const layout= loading.effects['user/getUserInfo']?(<Spin  size="large"/>):(
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu
          menuData={this.getMenuData(privileges)}
          collapsed={this.state.collapsed}
          location={location}
          onCollapse={this.handleMenuCollapse}
          logo={logo}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)"}}>
          <GlobalHeader
            user={user}
            onCollapse={this.handleMenuCollapse}
            collapsed={this.state.collapsed}
          />
          </Header> 
          <Content style={{ margin: '16px 16px' ,background: 'white'}}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div>
              <Switch>

                {
                  getRouter(routeData, privileges).map((item, index) => {
                    return (
                      <Route
                        key={index}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  })
                  // console.log( getRouter(routeData,this.state.userInfo.privileges))
                }
                <Redirect exact from="/" to="/home" />
                {console.log('html')
                }
                <Route   render={NotFound}/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
    return (
          <div>
            {islogin? layout:( <Redirect  to="/login" />)}
          </div>
    );
  }
}

layoutDom.propTypes = {
};

const mapStateToProps = (state) => {
  return { userData: state.user.userData, userInfo: state.user.userInfo };
}


// export default connect(mapStateToProps)(layoutDom)

export default connect(({user,loading })=>{
  return { userData: user.userData,loading,...user};
})(layoutDom) 
