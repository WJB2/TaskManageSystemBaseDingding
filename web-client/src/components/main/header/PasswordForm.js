import React, { PureComponent } from 'react';

import { Modal, Form, Input, Alert } from 'antd';

const FormItem = Form.Item;

@Form.create({})
class PasswordForm extends PureComponent {

  state={
   errorMessage:''
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {

      if(values.newPassword!=values.confirmPassword){
        this.setState({
          errorMessage:'两次密码输入不相符，请重新输入'
        });
        return;
      }

      if (!err && onSubmit) {
        onSubmit(values);
      }
    });
  }

  handleCancel(e) {
    e.preventDefault();
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const modalConfig = {
      title: '修改密码',
      visible: true,
      onOk: this.handleFormSubmit.bind(this),
      onCancel: this.handleCancel.bind(this),
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 18 },
      },
    };

    return (
      <Modal {...modalConfig}>
        {this.state.errorMessage? <Alert style={{marginBottom:16}} message={this.state.errorMessage} type={"error"}/>:null}
        <Form>
          <FormItem {...formItemLayout} label="原密码">
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '请输入原密码' }],
            })(<Input placeholder="请输入原密码" type='password' />)}
          </FormItem>

          <FormItem {...formItemLayout} label="新密码">
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: '请输入新密码' }],
            })(<Input placeholder="请输入新密码" type='password' />)}
          </FormItem>

          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: '请再次输入新密码' }],
            })(<Input placeholder="请再次输入新密码" type='password' />)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default PasswordForm;
