import React, {Component, createRef} from 'react';
import moment from "moment/moment";

import {Form, Input, DatePicker, Tag, Icon, Slider} from 'antd';

import fileService from './../../../services/system/FileService'

import TaskTagSelector from './../../../components/tm/task/TaskTagSelector';
import FileSelector from './../../../components/system/form/FileSelector'
import ImageSelector from "../../../components/system/form/ImageSelector";
import StaffSelector from "../../../components/system/form/StaffSelector";

const FormItem = Form.Item;

class TaskAddForm extends Component {

  constructor(props) {
    super(props);

    this.imageSelectorRef = createRef();
    this.assigneeIdListSelectorRef = createRef();
    this.supervisorIdListSelectorRef = createRef();
  }

  onProjectChange(project){
    if(!this.assigneeIdListSelectorRef.state.value||this.assigneeIdListSelectorRef.state.value.length<1) {
      this.assigneeIdListSelectorRef.setState({
        value: project.assigneeIdList,
      });
    }
    if(!this.supervisorIdListSelectorRef.state.value||this.supervisorIdListSelectorRef.state.value.length<1){
      this.supervisorIdListSelectorRef.setState({
        value: project.supervisorIdList,
      });
    }
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  onImageSelectorRef(ref) {
    this.imageSelectorRef = ref;
  }

  onAssigneeIdListSelectorRef(ref){
    this.assigneeIdListSelectorRef = ref;
  }

  onSupervisorIdListSelectorRef(ref){
    this.supervisorIdListSelectorRef = ref;
  }

  addImageInfo(fileInfo) {
    this.imageSelectorRef.addFile(fileInfo);
  }

  render() {

    const {styles, formItemLayout, getFieldDecorator, task, project} = this.props;

    return (
      <div>
        <FormItem {...formItemLayout} label={'任务标题'} style={{marginBottom: 12}}>
          {getFieldDecorator('title', {
            rules: [{required: true, message: '请输入任务标题'}],
            initialValue: task.title,
          })(
            <Input placeholder="请输入任务标题"/>
          )}
        </FormItem>

        {/*<FormItem {...formItemLayout} label={'任务标签'} style={{marginBottom:12}}>
          {getFieldDecorator('tagIdList', {
            rules: [{ required: false, message: '请选择任务标签' }],
            initialValue: task.tagIdList,
          })(<TaskTagSelector />)}
        </FormItem>
        */}
        <FormItem {...formItemLayout} label={'图片'} style={{marginBottom: 12}}>
          {getFieldDecorator('imageIdList', {
            rules: [{required: false, message: '请选择图片'}],
            initialValue: task.imageIdList,
          })(<ImageSelector onRef={this.onImageSelectorRef.bind(this)}/>)}
        </FormItem>

        <FormItem {...formItemLayout} label={'任务描述'} style={{marginBottom: 12}}>
          {getFieldDecorator('content', {
            rules: [{required: false, message: '请输入任务描述'}],
            initialValue: task.content,
          })(<Input.TextArea placeholder="请输入任务描述"/>)}
        </FormItem>

        <FormItem {...formItemLayout} label={'责任人'} style={{marginBottom: 12}}>
          {getFieldDecorator('assigneeIdList', {
            rules: [{required: true, message: '请选择任务责任人'}],
            initialValue: !task.assigneeIdList&&project?project.assigneeIdList:task.assigneeIdList,
          })(
            <StaffSelector onRef={this.onAssigneeIdListSelectorRef.bind(this)} mode={'multiple'} maxItemCounts={1}/>
          )}
        </FormItem>

        {/*<FormItem {...formItemLayout} label={'参与人'} style={{marginBottom:12}}>
          {getFieldDecorator('participatorIdList', {
            rules: [{ required: false, message: '请选择任务参与人' }],
            initialValue: task.participatorIdList,
          })(
            <StaffSelector mode={'multiple'} />
          )}
        </FormItem>*/}

        <FormItem {...formItemLayout} label={'关注人'} style={{marginBottom: 12}}>
          {getFieldDecorator('supervisorIdList', {
            rules: [{required: false, message: '请选择任务关注人'}],
            initialValue: !task.supervisorIdList&&project?project.supervisorIdList:task.supervisorIdList,
          })(
            <StaffSelector onRef={this.onSupervisorIdListSelectorRef.bind(this)} mode={'multiple'}/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={'开始时间'} style={{marginBottom: 12}}>
          {getFieldDecorator('beginTime', {
            rules: [{required: true, message: '请选择开始时间'}],
            initialValue: task.beginTime ? moment(task.beginTime, 'YYYYMMDDHHmmssSSS') : moment(new Date()),
          })(
            <DatePicker/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={'截止时间'} style={{marginBottom: 12}}>
          {getFieldDecorator('endTime', {
            rules: [{required: true, message: '请选择截止时间'}],
            initialValue: task.endTime ? moment(task.endTime, 'YYYYMMDDHHmmssSSS') : moment(new Date()).add(1, 'day'),
          })(
            <DatePicker/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={'附件'} style={{marginBottom: 12}}>
          {getFieldDecorator('attachmentIdList', {
            rules: [{required: false, message: '请添加附件'}],
            initialValue: task.attachmentIdList,
          })(
            <FileSelector/>
          )}
        </FormItem>
      </div>
    );
  }
}

export default TaskAddForm;
