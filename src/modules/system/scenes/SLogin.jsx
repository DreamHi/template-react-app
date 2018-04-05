import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import '../../../static/css/login.css';
import { post } from '../../../util/fetch';
import { API_LOGIN, ROUTE_HOME } from '../../../util/constants';
import storage from '../../../util/storage';

const FormItem = Form.Item;
const history = createHistory({forceRefresh: true});

class SLogin extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post(API_LOGIN, values, (error, response) => {
          if (error) {
            Modal.error({
              title: '用户名或者密码不正确。',
              okText: 'OK',
            });
          } else {
            if (response.user.valid === 0) {
              Modal.error({
                title: '用户名或者密码不正确。',
                okText: 'OK',
              });
            } else {
              storage.authenticateUser(response.token);
              storage.setUser(response.user);
              history.replace(ROUTE_HOME);
            }
          }
        });
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="components-form-demo-normal-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pass', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SLogin);