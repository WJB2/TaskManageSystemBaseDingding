import React, { PureComponent } from 'react';

import { Modal, Form, Input, InputNumber } from 'antd';

import OrganizationTreeSelector from './../../../components/system/form/OrganizationTreeSelector';

const FormItem = Form.Item;

@Form.create({})
class OrganizationForm extends PureComponent {
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
    const { formType, currentOrganization } = this.props;
    const { getFieldDecorator } = this.props.form;

    const organization = formType === 'EDIT' ? currentOrganization : {};

    const modalConfig = {
      title: formType === 'EDIT' ? '编辑组织机构' : '新建组织机构',
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
          <FormItem {...formItemLayout} label="组织机构编码">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入组织机构编码' }],
              initialValue: organization.code,
            })(<Input placeholder="请输入组织机构编码" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="组织机构名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入组织机构名称' }],
              initialValue: organization.name,
            })(<Input placeholder="请输入组织机构名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="组织机构简称">
            {getFieldDecorator('nameAbbr', {
              rules: [{ required: false, message: '请输入组织机构简称' }],
              initialValue: organization.nameAbbr,
            })(<Input placeholder="请输入组织机构简称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="组织机构别名">
            {getFieldDecorator('nameAlias', {
              rules: [{ required: false, message: '请输入组织机构别名' }],
              initialValue: organization.nameAlias,
            })(<Input placeholder="请输入组织机构别名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="上级组织机构">
            {getFieldDecorator('parentId', {
              rules: [{ required: false, message: '请选择上级组织机构' }],
              initialValue: organization.parentId,
            })(<OrganizationTreeSelector placeholder="请选择上级组织机构" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="显示顺序">
            {getFieldDecorator('sortNo', {
              rules: [{ required: false, message: '请输入显示顺序' }],
              initialValue: organization.sortNo?organization.sortNo:50,
            })(<InputNumber style={{width:'100%'}} placeholder="请输入显示顺序" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default OrganizationForm;
