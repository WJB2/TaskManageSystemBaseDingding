import React, {PureComponent} from 'react';
import moment from 'moment';

import {List, Input, Icon, Button, Row, Col, Card} from 'antd';
import TaskTypeEnum from "../../../enum/tm/TaskTypeEnum";

class TaskOperateLogList extends PureComponent {

  state = {
    commentValue : '',
    progressValue: '',
    fileIdList: '',
  }

  formatTime(time){
    const opTime = moment(time, 'YYYYMMDDHHmmssSSS');
    const opMils = opTime.valueOf();
    const nowMils = new Date().getTime();

    if((nowMils-opMils)/1000<60){
      return parseInt((nowMils-opMils)/1000) + "秒前"
    }

    if((nowMils-opMils)/(60*1000)<60){
      return parseInt((nowMils-opMils)/(60*1000)) + "分前"
    }

    if((nowMils-opMils)/(60*60*1000)<24){
      return parseInt((nowMils-opMils)/(60*60*1000)) + "小时前"
    }

    if((nowMils-opMils)/(24*60*60*1000)<3){
      return parseInt((nowMils-opMils)/(24*60*60*1000)) + "天前"
    }

    return opTime.format("YYYY-MM-DD HH:mm:ss");
  }

  render(){
    const {dataSource, onComment, currentStaffId, task} = this.props;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card  title={'跟进记录'}>
            <div style={{display:'flex'}}>
              <Input value={this.state.commentValue} style={{flex:'1', marginRight:8}} onChange={(e)=>{this.setState({commentValue:e.target.value})}}/>
              <Button style={{width:80}} type={'primary'} onClick={()=>{
                if(onComment&&this.state.commentValue){
                  onComment({
                    taskId: this.props.task.id,
                    comment:this.state.commentValue,
                    commentType:'COMMENT'
                  });

                  this.setState({
                    commentValue:''
                  })
                }
              }}>发送</Button>
            </div>
            <List dataSource={dataSource.filter((item)=>{return 'PROGRESS'!==item.opType})} renderItem={(log)=>{
              return (
                <List.Item>
                  {this.formatTime(log.operateTime)}&nbsp;&nbsp;&nbsp;&nbsp;{log.operateBy.name}&nbsp;&nbsp;&nbsp;&nbsp;{log.description?log.description:TaskTypeEnum.getDisplayText(log.opType)}
                </List.Item>
              );
            }}/>
          </Card>
        </Col>

        <Col span={12}>
          <Card  title={'进度说明'}>
            {
              task.assigneeIdList&&task.assigneeIdList.indexOf(currentStaffId)>=0&&
              <div style={{display:'flex'}}>
                <Input value={this.state.progressValue} style={{flex:'1', marginRight:8}} onChange={(e)=>{this.setState({progressValue:e.target.value})}}/>
                <Button style={{width:80}} type={'primary'} onClick={()=>{
                  if(onComment&&this.state.progressValue){
                    onComment({
                      taskId: this.props.task.id,
                      comment:this.state.progressValue,
                      commentType:'PROGRESS'
                    });

                    this.setState({
                      progressValue:''
                    })
                  }
                }}>提交</Button>
              </div>
            }

            <List dataSource={dataSource.filter((item)=>{return 'PROGRESS'===item.opType})} renderItem={(log)=>{
              return (
                <List.Item>
                  {this.formatTime(log.operateTime)}&nbsp;&nbsp;&nbsp;&nbsp;{log.operateBy.name}&nbsp;&nbsp;&nbsp;&nbsp;{log.description?log.description:TaskTypeEnum.getDisplayText(log.opType)}
                </List.Item>
              );
            }}/>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default TaskOperateLogList;
