import React, {PureComponent} from 'react';

import {Form, Modal, Input} from 'antd';

const FormItem = Form.Item;

@Form.create({})
class TaskGroupForm extends PureComponent {

  handleFormSubmit(e) {
    e.preventDefault();
    const { onSubmit,currentTaskGroup} = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && onSubmit) {
        onSubmit({...values, id:currentTaskGroup&&currentTaskGroup.id?currentTaskGroup.id:null});
      }
    });
  }

  handleCancel(e) {
    e.preventDefault();
    const { onCancel, onDelete, formType,currentTaskGroup} = this.props;
    if (formType==='ADD' && onCancel) {
      onCancel();
    }

    if (formType==='EDIT' && onDelete) {
      onDelete(currentTaskGroup);
    }
  }

  render(){

    const {formType, currentTaskGroup} = this.props;

    const taskGroup = currentTaskGroup || {};

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
        title={formType==='EDIT'?'编辑群组':'新建群组'}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleFormSubmit.bind(this)}
      >
        <Form>
          <FormItem {...formItemLayout} label="群组">
            {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入群组名称' }],
            initialValue: taskGroup.name,
          })(
            <Input placeholder="请输入群组名称" />
          )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}


export default TaskGroupForm;
