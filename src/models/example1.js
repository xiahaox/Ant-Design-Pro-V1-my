
export default {

  namespace: 'example',

  state: {},

  
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
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
