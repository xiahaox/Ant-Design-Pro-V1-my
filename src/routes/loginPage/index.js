
import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import style from './index.css'
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        this.props.dispatch({
          type:'user/login',
          payload:{...values}
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log( this.props);
    
    return (
      <Form onSubmit={this.handleSubmit}  style={{  'maxWidth': '300px','margin':'auto'}}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className={style.loginBtn}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.user };
}
const loginPage = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps)(loginPage);