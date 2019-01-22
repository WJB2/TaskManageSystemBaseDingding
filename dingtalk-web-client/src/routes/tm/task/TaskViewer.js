import React, {PureComponent} from 'react';

import {Tabs, Row, Col, DatePicker, Slider, Form, Input, Tag, Icon, Avatar} from 'antd';
import moment from "moment/moment";

import FileSelector from './../../../components/system/form/FileSelector'
import ImageSelector from "../../../components/system/form/ImageSelector";
import StaffSelector from "../../../components/system/form/StaffSelector";
import TaskOperateLogList from "./TaskOperateLogList";
import SubTaskList from "./SubTaskList";

const {TabPane} = Tabs;
const FormItem = Form.Item;

class TaskViewer extends PureComponent {

  render(){
    const {styles, formItemLayout, getFieldDecorator, task, taskOperateLogList, onComment, onAddSubTask, subTaskList, onEdit, currentStaffId} = this.props;

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
            <Col span={18}>
              <FormItem style={{marginBottom:12}}>
                <div>{task.title}</div>
              </FormItem>
              <FormItem style={{marginBottom:12}}>
                <div>
                  {task.tagList&&task.tagList.map((tag)=>{
                    return <Tag key={tag.id}>{tag.name}</Tag>
                  })}
                </div>
              </FormItem>

            </Col>
            <Col span={6}>
              <FormItem {...rightFormItemLayout} label={'开始时间'} style={{marginBottom:12, height:32, lineHeight:'32px'}}>
                <div>{task.beginTime?moment(task.beginTime, "YYYYMMDDHHmmssSSS").format("YYYY-MM-DD"):''}</div>
              </FormItem>
              <FormItem {...rightFormItemLayout} label={'截止时间'} style={{marginBottom:12, height:32, lineHeight:'32px'}}>
                <div>{task.endTime?moment(task.endTime, "YYYYMMDDHHmmssSSS").format("YYYY-MM-DD"):''}</div>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem style={{marginBottom:12}}>
                <Row gutter={24}>
                  <Col span={4}>
                    <div style={{lineHeight:'32px'}}>责任人</div>
                    {
                      task.assigneeList&&task.assigneeList.map((assignee)=>{
                        return <Avatar key={assignee.id} size={'large'} style={{marginRight:8}}>{assignee.name}</Avatar>
                      })
                    }
                  </Col>
                  <Col span={10}>
                    <div style={{lineHeight:'32px'}}>参与人</div>
                    {
                      task.participatorList&&task.participatorList.map((participator)=>{
                        return <Avatar key={participator.id} size={'large'} style={{marginRight:8}}>{participator.name}</Avatar>
                      })
                    }
                  </Col>
                  <Col span={10}>
                    <div style={{lineHeight:'32px'}}>关注人</div>
                    {
                      task.supervisorList&&task.supervisorList.map((supervisor)=>{
                        return <Avatar key={supervisor.id} size={'large'} style={{marginRight:8}}>{supervisor.name}</Avatar>
                      })
                    }
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>

        </div>

        <div>
          <Tabs>
            <TabPane tab={'任务描述'} key={"description"}>
              <FormItem>
                <div>{task.content}</div>
              </FormItem>
              <TaskOperateLogList task={task} dataSource={taskOperateLogList} onComment={onComment} currentStaffId={currentStaffId}/>
            </TabPane>
            <TabPane tab={'图片'} key={"images"}>
              <FormItem  style={{marginBottom:12}}>
                {getFieldDecorator('imageIdList', {
                  rules: [],
                  initialValue: task.imageIdList,
                })(<ImageSelector disabled={true} />)}
              </FormItem>
            </TabPane>
            <TabPane tab={'子任务'} key={"subtask"}>
              <SubTaskList task={task} subTaskList={subTaskList} onEdit={onEdit} onAddSubTask={onAddSubTask}/>
            </TabPane>
            <TabPane tab={'附件'} key={"attachments"}>
              <FormItem  style={{marginBottom:12}}>
                {getFieldDecorator('attachmentIdList', {
                  rules: [],
                  initialValue: task.attachmentIdList,
                })(<FileSelector disabled={true} />)}
              </FormItem>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TaskViewer;
