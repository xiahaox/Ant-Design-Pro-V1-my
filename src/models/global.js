
import {login,getUserInfo,logout} from "../services/user"
import { createHashHistory } from 'history';
import { routerRedux } from 'dva/router';
export default {

    namespace: 'user',
  
    state: {
      userData:{},
      privileges:[],
      user:'',
      islogin:false
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        // history.listen(()=>{
        //   console.log(111);
          
        // })
        // document.addEventListener('click',() => {   //这里表示当鼠标点击时就会触发里面的dispatch命令，这里的save就是reducers中的方法名
        //   console.log(111);
        // })
        
      },
    },
  
    effects: {
      *login({payload},{call,put}){
        const response=yield call(login,payload)
        console.log(response);
        yield put({ type: 'userDataSave' ,payload:{...response.data}})
        console.log(response.data);
        Object.keys(response.data.data).forEach(m=>{
          window.sessionStorage.setItem(m, typeof response.data.data[m] ==='object'?JSON.stringify(response.data.data[m]):response.data.data[m] )
        })
        // yield put({type:'getUserInfo'})
        const history = createHashHistory();
        history.push('/home');
      },
      *getUserInfo({payload},{call,put}){
        const response=yield call(getUserInfo,payload)
        yield put({type:'save',payload:response.data})
      },
      *logout({payload},{call,put}){
        const response= yield call(logout)
        if (response.data.status=='ok') {
          console.log(1);
            yield put({ type: 'save' ,payload:{user:''}});
            sessionStorage.removeItem('token')
            yield put(
              routerRedux.push({
                pathname: '/login',
              })
            );

        } 
      }
    },
  
    reducers: {
      userDataSave(state, action) {
        console.log(action.payload);
        
        return {...state,userData:  action.payload};
      },
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  