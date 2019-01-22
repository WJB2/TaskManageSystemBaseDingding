import React, {PureComponent} from 'react';

import {Tabs, Row, Col, DatePicker, Slider, Form, Input, List} from 'antd';
import moment from "moment/moment";

import TaskTypeEnum from './../../../enum/tm/TaskTypeEnum';

import TaskTagSelector from './../../../components/tm/task/TaskTagSelector';

import FileSelector from './../../../components/system/form/FileSelector'
import ImageSelector from "../../../components/system/form/ImageSelector";
import StaffSelector from "../../../components/system/form/StaffSelector";
import TaskOperateLogList from "./TaskOperateLogList";
import SubTaskList from "./SubTaskList";

const {TabPane} = Tabs;
const FormItem = Form.Item;

class TaskEditForm extends PureComponent {

  componentDidMount(){
    this.props.onRef(this);
  }

  render(){
    const {styles, formItemLayout, getFieldDecorator, task, taskOperateLogList, onComment, onAddSubTask, subTaskList, onEdit, currentStaffId} = this.props;

    console.log(task);

    const rightFormItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
      },
    };

    return (
      <div>
        <div style={{marginTop:16}}>
          <Row gutter={24}>
            {
              task.parentId&&
              <Col span={24}>

              </Col>
            }
            <Col span={18}>
              <Row gutter={8}>
                <Col span={24}>
                  <FormItem {...formItemLayout} label={'任务标题'} style={{marginBottom:12}}>
                    {getFieldDecorator('title', {
                      rules: [{ required: true, message: '请输入任务标题' }],
                      initialValue: task.title,
                    })(
                      <Input placeholder="请输入任务标题" />
                    )}
                  </FormItem>
                </Col>
                {/*<Col span={24}>
                  <FormItem {...formItemLayout} label={'任务标签'} style={{marginBottom:12}}>
                    {getFieldDecorator('tagIdList', {
                      rules: [{ required: false, message: '请选择任务标签' }],
                      initialValue: task.tagIdList,
                    })(<TaskTagSelector />)}
                  </FormItem>
                </Col>*/}
                <Col span={4}>
                  <div>责任人</div>
                  <FormItem style={{marginBottom:12}}>
                    {getFieldDecorator('assigneeIdList', {
                      rules: [{ required: true, message: '请选择任务责任人' }],
                      initialValue: task.assigneeIdList,
                    })(
                      <StaffSelector mode={'multiple'} maxItemCounts={1}/>
                    )}
                  </FormItem>
                </Col>
               {/* <Col span={10}>
                  <div>参与人</div>
                  <FormItem style={{marginBottom:12}}>
                    {getFieldDecorator('participatorIdList', {
                      rules: [{ required: false, message: '请选择参与人' }],
                      initialValue: task.participatorIdList,
                    })(
                      <StaffSelector mode={'multiple'}/>
                    )}
                  </FormItem>
                </Col>*/}
                <Col span={10}>
                  <Col span={10}>
                    <div>关注人</div>
                    <FormItem style={{marginBottom:12}}>
                      {getFieldDecorator('supervisorIdList', {
                        rules: [{ required: false, message: '请选择关注人' }],
                        initialValue: task.supervisorIdList,
                      })(
                        <StaffSelector mode={'multiple'}/>
                      )}
                    </FormItem>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <FormItem {...rightFormItemLayout} label={'开始时间'} style={{marginBottom:12}}>
                {getFieldDecorator('beginTime', {
                  rules: [{ required: true, message: '请选择开始时间' }],
                  initialValue: task.beginTime?moment(task.beginTime, 'YYYYMMDDHHmmssSSS'):null,
                })(
                  <DatePicker />
                )}
              </FormItem>
              <FormItem {...rightFormItemLayout} label={'截止时间'} style={{marginBottom:12}}>
                {getFieldDecorator('endTime', {
                  rules: [{ required: true, message: '请选择截止时间' }],
                  initialValue: task.endTime?moment(task.endTime, 'YYYYMMDDHHmmssSSS'):null,
                })(
                  <DatePicker />
                )}
              </FormItem>
              <FormItem {...rightFormItemLayout} label={'任务进度'} style={{marginBottom:12}}>
                {getFieldDecorator('progressStatus', {
                  rules: [{ required: false, message: '' }],
                  initialValue: task.progressStatus,
                })(<Slider   />)}
              </FormItem>
            </Col>
          </Row>
        </div>

        <div>
          <Tabs>
            <TabPane tab={'任务描述'} key={"description"}>
              <FormItem>
                {getFieldDecorator('content', {
                  rules: [{ required: false, message: '请输入任务描述' }],
                  initialValue: task.content,
                })(<Input.TextArea placeholder="请输入任务描述" />)}
              </FormItem>
              <TaskOperateLogList task={task} dataSource={taskOperateLogList} onComment={onComment} currentStaffId={currentStaffId}/>
            </TabPane>
            <TabPane tab={'图片'} key={"images"}>
              <FormItem  style={{marginBottom:12}}>
                {getFieldDecorator('imageIdList', {
                  rules: [],
                  initialValue: task.imageIdList,
                })(<ImageSelector />)}
              </FormItem>
            </TabPane>
            <TabPane tab={'子任务'} key={"subtask"}>
              <SubTaskList task={task} subTaskList={subTaskList} onEdit={onEdit} onAddSubTask={onAddSubTask} />
            </TabPane>
            <TabPane tab={'附件'} key={"attachments"}>
              <FormItem  style={{marginBottom:12}}>
                {getFieldDecorator('attachmentIdList', {
                  rules: [],
                  initialValue: task.attachmentIdList,
                })(<FileSelector />)}
              </FormItem>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TaskEditForm;
