import React, { PureComponent } from 'react';

import { Form, Input, Icon, Button, Alert } from 'antd';

import styles from './Login.less';

const FormItem = Form.Item;

class Login extends PureComponent {
  handleSubmit = () => {
    const { onSubmit = null } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err && onSubmit) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { errorText } = this.props;

    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.login_panel}>
        {errorText ? <Alert message={errorText} type="error" style={{ marginBottom: 24 }} /> : null}
        <Form layout="vertical">
          <FormItem>
            {getFieldDecorator('username', {})(
              <Input
                size="large"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {})(
              <Input
                size="large"
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入密码"
              />
            )}
          </FormItem>

          <Button
            type="primary"
            size="large"
            onClick={this.handleSubmit}
            className={styles.submit_btn}
          >
            登入
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
