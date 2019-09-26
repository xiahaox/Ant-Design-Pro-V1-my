import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon ,Spin } from 'antd'
import { Link, Redirect, Route, Switch, } from 'dva/router';
import { getMenu, getRouter,getOpenKeys } from '../utils/utils'
import menuData from '../common/menu'
import NotFound from '../routes/error/404'
import GlobalHeader from '../components/GlobalHeader'
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
  
  onCollapse = collapsed => {
    // console.log(collapsed);
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
    getOpenKeys(menuData,location.pathname)
    this.setState({
      openKeys:[getOpenKeys(menuData,location.pathname)]
    })
  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps',nextProps);
  }
  handleOpenChange(openKeys){  //当前所激活的path项
    // console.log(openKeys); 
    const lastOpenKey = openKeys[openKeys.length - 1];
    this.setState({
      openKeys:[lastOpenKey]
    })
  }
  defaultSelectedKeys=(location)=>{
    return [location.pathname]
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
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark"  selectedKeys={this.defaultSelectedKeys(location)} mode="inline"  onOpenChange={this.handleOpenChange.bind(this)}   openKeys={openKeys}>
            {
              // console.log(this.props.userInfo.privileges)
              getMenu(menuData,privileges).map(item => {
                console.log(item);
                return (
                  <SubMenu
                    key={item.path}
                    title={
                      <span>
                        <Icon type={item.meta.icon} />
                        <span>{item.meta.title}</span>
                      </span>
                    }
                  >
                    {
                      item.children.map(m => (
                        <Menu.Item key={m.path}>
                          <Link to={m.path} >{m.meta.title}</Link>
                        </Menu.Item>
                      ))
                    }

                  </SubMenu>
                )

              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          <GlobalHeader
            user={user}
          
          />
          </Header> 
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
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
