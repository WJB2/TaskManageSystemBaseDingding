import React, {PureComponent} from 'react';

import moment from 'moment';

import {Tabs, Input, Button, Switch, Select, Row, Col, Icon, Form, Tag, DatePicker, Modal, Radio, Dropdown} from 'antd';

import OrganizationSelector from './../../../components/system/form/OrganizationTreeSelector';
import StaffSelector from './../../../components/system/form/StaffSelector';

import styles from './ProjectIndex.less';

const {TabPane} = Tabs;
const {Search} = Input;
const {Option, OptGroup} = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create({})
class ProjectForm extends PureComponent {

  handleFormSubmit(e) {
    e.preventDefault();
    const { onSubmit,currentProject} = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && onSubmit) {
        if(values.period){
          values.beginTime = values.period[0]?values.period[0].format("YYYY-MM-DD"):null;
          values.endTime = values.period[1]?values.period[1].format("YYYY-MM-DD"):null;
        }
        delete values.period;

        onSubmit({...values, id:currentProject&&currentProject.id?currentProject.id:null});
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

  render(){

    const {formType, currentProject} = this.props;

    const project = currentProject || {};

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
        title={formType==='EDIT'?'编辑项目':'新建项目'}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleFormSubmit.bind(this)}
      >
        <Form>
          <FormItem {...formItemLayout} label="项目名称">
            {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入项目名称' }],
            initialValue: project.name,
          })(
            <Input placeholder="请输入项目名称" />
          )}
          </FormItem>

          <FormItem {...formItemLayout} label="所属部门">
            {getFieldDecorator('orgIdList', {
            rules: [{ required: true, message: '请选择项目所属部门' }],
            initialValue: project.orgIdList&&project.orgIdList.length>0?project.orgIdList:null,
          })(
            <OrganizationSelector multiple placeholder="请选择项目所属部门" />
          )}
          </FormItem>

          <FormItem {...formItemLayout} label="项目描述">
            {getFieldDecorator('description', {
            rules: [{ required: false, message: '请输入项目描述' }],
            initialValue: project.description,
          })(
            <Input.TextArea placeholder="请输入项目描述" />
          )}
          </FormItem>

          <FormItem {...formItemLayout} label="项目成员">
            {getFieldDecorator('memberIdList', {
            rules: [{ required: false, message: '请添加项目成员' }],
            initialValue: (project.memberIdList&&project.memberIdList.length>0?project.memberIdList:undefined),
          })(
            <StaffSelector mode="multiple" placeholder="请添加项目成员" />
          )}
          </FormItem>

          <FormItem {...formItemLayout} label="默认责任人">
            {getFieldDecorator('assigneeIdList', {
              rules: [{ required: false, message: '请添加默认责任人' }],
              initialValue: (project.assigneeIdList&&project.assigneeIdList.length>0?project.assigneeIdList:undefined),
            })(
              <StaffSelector mode={'multiple'} maxItemCounts={1} placeholder="请添加默认责任人" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="默认关注人">
            {getFieldDecorator('supervisorIdList', {
              rules: [{ required: false, message: '请添加默认关注人' }],
              initialValue: (project.supervisorIdList&&project.supervisorIdList.length>0?project.supervisorIdList:undefined),
            })(
              <StaffSelector mode="multiple" placeholder="请添加默认关注人" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="起止时间">
            {getFieldDecorator('period', {
            rules: [{ required: false, message: '请选择起止时间' }],
            initialValue: project.beginTime&&project.endTime?[moment(project.beginTime, 'YYYYMMDDHHmmssSSS'), moment(project.endTime, 'YYYYMMDDHHmmssSSS')]:null,
          })(
            <DatePicker.RangePicker  />
          )}
          </FormItem>

          <FormItem {...formItemLayout} label="标记">
            {getFieldDecorator('label', {
            rules: [{ required: false }],
            initialValue: project.label,
          })(
            <RadioGroup >
              <Radio value="rgb(255, 102, 92)" style={{color:'rgb(255, 102, 92)'}}>
                <div style={{width:15, height:15, backgroundColor:"rgb(255, 102, 92)", display:'inline-block'}}  />
              </Radio>
              <Radio value="rgb(249, 166, 76)" style={{color:'rgb(249, 166, 76)'}} />
              <Radio value="rgb(245, 207, 81)" style={{color:'rgb(245, 207, 81)'}} />
              <Radio value="rgb(114, 203, 86)" style={{color:'rgb(114, 203, 86)'}} />
            </RadioGroup>
          )}

          </FormItem>
        </Form>
      </Modal>
    );
  }
}


export default ProjectForm;
