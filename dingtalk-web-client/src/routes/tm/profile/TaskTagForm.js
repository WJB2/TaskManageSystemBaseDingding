import React, {PureComponent} from 'react';

import {Form, Modal, Input} from 'antd';

const FormItem = Form.Item;

@Form.create({})
class TaskTagForm extends PureComponent {

  handleFormSubmit(e) {
    e.preventDefault();
    const { onSubmit,currentTaskTag} = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && onSubmit) {
        onSubmit({...values, id:currentTaskTag&&currentTaskTag.id?currentTaskTag.id:null});
      }
    });
  }

  handleCancel(e) {
    e.preventDefault();
    const { onCancel, onDelete, formType,currentTaskTag} = this.props;
    if (formType==='ADD' && onCancel) {
      onCancel();
    }

    if (formType==='EDIT' && onDelete) {
      onDelete(currentTaskTag);
    }
  }

  render(){

    const {formType, currentTaskTag} = this.props;

    const taskTag = currentTaskTag || {};

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };

    return (
      <Modal
        visible
        closable={false}
        cancelText={formType==='EDIT'?'删除':'取消'}
        title={formType==='EDIT'?'编辑标签':'新建标签'}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleFormSubmit.bind(this)}
      >
        <Form>
          <FormItem {...formItemLayout} label="标签">
            {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入标签名称' }],
            initialValue: taskTag.name,
          })(
            <Input placeholder="请输入标签名称" />
          )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}


export default TaskTagForm;
