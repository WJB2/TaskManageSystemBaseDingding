import React, { PureComponent } from 'react';

import { Modal, Form } from 'antd';

import OrganizationTreeSelector from './../../../components/system/form/OrganizationTreeSelector';
import PostTreeSelector from './../../../components/system/form/PostTreeSelector';
import StaffSelector from './../../../components/system/form/StaffSelector';
import RoleSelector from './../../../components/system/form/RoleSelector';

const FormItem = Form.Item;

@Form.create({})
class PositionForm extends PureComponent {
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
    const { formType, currentPosition } = this.props;
    const { getFieldDecorator } = this.props.form;

    const position = formType === 'EDIT' ? currentPosition : {};

    const modalConfig = {
      title: formType === 'EDIT' ? '编辑人员岗位' : '新建人员岗位',
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
          <FormItem {...formItemLayout} label="人员姓名">
            {getFieldDecorator('staffId', {
              rules: [{ required: true, message: '请选择人员信息' }],
              initialValue: position.staffId,
            })(<StaffSelector placeholder="请选择人员信息" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="所属组织机构">
            {getFieldDecorator('orgId', {
              rules: [{ required: true, message: '请选择任职组织机构' }],
              initialValue: position.orgId,
            })(<OrganizationTreeSelector placeholder="请选择任职组织机构" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="工作职位">
            {getFieldDecorator('postId', {
              rules: [{ required: false, message: '请选择工作职位' }],
              initialValue: position.postId,
            })(<PostTreeSelector placeholder="请选择工作职位" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="所属角色">
            {getFieldDecorator('roleId', {
              rules: [{ required: false, message: '请选择用户角色' }],
              initialValue: position.roleId,
            })(<RoleSelector mode="multiple" placeholder="请选择用户角色" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default PositionForm;
