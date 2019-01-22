import React, { PureComponent } from 'react';

import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

@Form.create({})
class RoleForm extends PureComponent {
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
    const { formType, currentRole } = this.props;
    const { getFieldDecorator } = this.props.form;

    const role = formType === 'EDIT' ? currentRole : {};

    const modalConfig = {
      title: formType === 'EDIT' ? '编辑角色' : '新建角色',
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
          <FormItem {...formItemLayout} label="角色编码">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入角色编码' }],
              initialValue: role.code,
            })(<Input placeholder="请输入角色编码" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入角色名称' }],
              initialValue: role.name,
            })(<Input placeholder="请输入角色名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="角色简称">
            {getFieldDecorator('nameAbbr', {
              rules: [{ required: false, message: '请输入角色简称' }],
              initialValue: role.nameAbbr,
            })(<Input placeholder="请输入角色简称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="角色别名">
            {getFieldDecorator('nameAlias', {
              rules: [{ required: false, message: '请输入角色别名' }],
              initialValue: role.nameAlias,
            })(<Input placeholder="请输入角色别名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="显示顺序">
            {getFieldDecorator('sortNo', {
              rules: [{ required: false, message: '请输入显示顺序' }],
              initialValue: role.sortNo?role.sortNo:50,
            })(<InputNumber style={{width:'100%'}} placeholder="请输入显示顺序" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default RoleForm;
