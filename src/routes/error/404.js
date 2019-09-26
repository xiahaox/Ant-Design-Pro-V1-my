import React from 'react';
import { Button, Icon } from 'antd';
import style from './index.css'
function errorPage(props) {
  console.log('44444');
    function clickBtn() {
        props.history.goBack()
    }

  return (
    <div>
        <h1 className={style.btn}>404</h1>
        <Button type="primary" onClick={clickBtn}>
            <Icon type="left" />
            Backward
          </Button>
    </div>
  );
}

export default errorPage;
