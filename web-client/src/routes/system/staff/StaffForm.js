import React, { PureComponent } from 'react';

import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

@Form.create({})
class StaffForm extends PureComponent {
  handleFormSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
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
    const { formType, currentStaff } = this.props;
    const { getFieldDecorator } = this.props.form;

    const staff = formType === 'EDIT' ? currentStaff : {};

    const modalConfig = {
      title: formType === 'EDIT' ? '编辑人员' : '新建人员',
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
        <Form>
          <FormItem {...formItemLayout} label="人员用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入人员用户名' }],
              initialValue: staff.username,
            })(<Input placeholder="请输入人员用户名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="人员身份证号">
            {getFieldDecorator('idCardNo', {
              rules: [{ required: true, message: '请输入人员身份证号' }],
              initialValue: staff.idCardNo,
            })(<Input placeholder="请输入人员身份证号" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="人员姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入人员姓名' }],
              initialValue: staff.name,
            })(<Input placeholder="请输入人员姓名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="姓名拼音简码">
            {getFieldDecorator('namePinyin', {
              rules: [{ required: true, message: '请输入人员姓名拼音简码' }],
              initialValue: staff.namePinyin,
            })(<Input placeholder="请输入人员姓名拼音简码" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="人员手机号">
            {getFieldDecorator('mobile', {
              rules: [{ required: false, message: '请输入人员手机号' }],
              initialValue: staff.mobile,
            })(<Input placeholder="请输入人员手机号" />)}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default StaffForm;
