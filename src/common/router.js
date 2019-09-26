import React from 'react';
import dynamic from 'dva/dynamic';
import menuData from './menu'
const dynamicWrapper=(app, models, component)=>dynamic({
    app,
    models:()=> models.map(m=> import(`../models/${m}.js`)),
    component
})

function getFlatMenuData(menus) {
    console.log(menus);
    let result={}
    menus.forEach(item => {
        if (item.children) {
            result[item.path]=item.name
            result={...result,...getFlatMenuData(item.children)}  
        }else{
            result[item.path]=item.name
        }
    });
    return result
}

export const RouterConfig1=(app)=>{
    const routerData={
        '/':{
            component: dynamicWrapper(app, [], () => import('../layout/layout'))
        },
        '/home':{
            component: dynamicWrapper(app, [], () => import('../routes/homePage/index'))
        },
        '/user/user1':{
            component: dynamicWrapper(app, ['list'], () => import('../routes/user/user1')),
        },
        '/user/user1/user1Detail':{
            component: dynamicWrapper(app, ['list'], () => import('../routes/user/user1Detail')),
        },
        '/user/user2':{
            component: dynamicWrapper(app, [], () => import('../routes/user/user2'))
        },
        '/list/list1':{
            component: dynamicWrapper(app, ['list'], () => import('../routes/listPage/listPage'))
        },
        '/list/list2':{
            component: dynamicWrapper(app, ['list'], () => import('../routes/listPage/listPage2'))
        }
    }
    const menuDatas=getFlatMenuData(menuData)
    // console.log(menuDatas);
    var routerDataWithName={}
    Object.keys(routerData).forEach(key => {
        routerDataWithName[key]={
            ...routerData[key],
            name:menuDatas[key]
        }
    });
    return routerDataWithName

}
