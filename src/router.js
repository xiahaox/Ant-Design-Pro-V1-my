import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage/IndexPage';
import loginPage from './routes/loginPage/index';
// import layoutDom from './layout/layout';
import {RouterConfig1} from './common/router'

function RouterConfig({ history,app }) {
  const routeData=RouterConfig1(app)
  console.log(routeData);
  const BasicLayout=routeData['/'].component
  return (
    <Router  history={history}>
      <Switch>
        <Route path="/login" exact component={loginPage} />
        {/* <Route path="/"  component={layoutDom} /> */}
       <Route path="/"  render={props=>{ return <BasicLayout {...props} routeData={routeData} />
       }} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
