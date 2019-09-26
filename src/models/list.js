import {query,adduser } from '../services/user'
export default {

    namespace: 'list',
  
    state: {
      listData:[],
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        const response=yield call(query,payload)
        console.log(response);
        
        yield put({ type: 'save' ,payload:response.data});
      },
      *add({ payload }, { call, put }){
        const response=yield call(adduser,payload)
        yield put({ type: 'save' ,payload:response.data});
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  