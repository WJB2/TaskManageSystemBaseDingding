import React, { PureComponent } from 'react';

import { Modal, Form, Input, InputNumber } from 'antd';

import PostTreeSelector from './../../../components/system/form/PostTreeSelector';

const FormItem = Form.Item;

@Form.create({})
class PostForm extends PureComponent {
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
    const { formType, currentPost } = this.props;
    const { getFieldDecorator } = this.props.form;

    const post = formType === 'EDIT' ? currentPost : {};

    const modalConfig = {
      title: formType === 'EDIT' ? '编辑工作职位' : '新建工作职位',
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
          <FormItem {...formItemLayout} label="工作职位编码">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入工作职位编码' }],
              initialValue: post.code,
            })(<Input placeholder="请输入工作职位编码" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="工作职位名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入工作职位名称' }],
              initialValue: post.name,
            })(<Input placeholder="请输入工作职位名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="工作职位简称">
            {getFieldDecorator('nameAbbr', {
              rules: [{ required: false, message: '请输入工作职位简称' }],
              initialValue: post.nameAbbr,
            })(<Input placeholder="请输入工作职位简称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="工作职位别名">
            {getFieldDecorator('nameAlias', {
              rules: [{ required: false, message: '请输入工作职位别名' }],
              initialValue: post.nameAlias,
            })(<Input placeholder="请输入工作职位别名" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="上级工作职位">
            {getFieldDecorator('parentId', {
              rules: [{ required: false, message: '请选择上级工作职位' }],
              initialValue: post.parentId,
            })(<PostTreeSelector placeholder="请选择上级工作职位" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="显示顺序">
            {getFieldDecorator('sortNo', {
              rules: [{ required: false, message: '请输入显示顺序' }],
              initialValue: post.sortNo?post.sortNo:50,
            })(<InputNumber style={{width:'100%'}} placeholder="请输入显示顺序" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default PostForm;
