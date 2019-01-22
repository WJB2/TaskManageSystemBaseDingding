import React, {PureComponent} from 'react';

import {Card, Row, Col, Icon, Tag} from 'antd';
import taskTypeEnum from "../../../enum/tm/TaskTypeEnum";
import moment from "moment/moment";

class SubTaskList extends PureComponent {

  render(){

    const {task, subTaskList, onAddSubTask, onEdit} = this.props;

    return (
      <Row gutter={16}>
        {
          subTaskList&&subTaskList.map((item)=>{
            return (
              <Col span={8} style={{marginTop:16}} key={item.id}>
                <Card style={{height:140, padding:0, cursor:'pointer'}} bodyStyle={{padding:16}}>
                  <div>
                    <div><Tag>{taskTypeEnum.getDisplayText(item.taskType)}</Tag> <span style={{cursor:'pointer', fontWeight:'bold'}} onClick={()=>{
                      onEdit(item);
                    }}>{item.title}</span></div>
                    <div style={{marginTop:8}}>
                      <div style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width:20,height:20, borderRadius:10, fontSize:10, textAlign:'center', lineHeight:'20px', display:'inline-block' }} >责</div>
                      <span style={{marginLeft:8}}>{item.assigneeList?item.assigneeList.map(item=>item.name).join('、'):''}</span>
                    </div>
                    <div style={{marginTop:8, lineHeight:'20px', fontSize:12}}>
                      <div style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width:20,height:20, borderRadius:10, fontSize:10, textAlign:'center', lineHeight:'20px', display:'inline-block' }} >止</div>
                      <span style={{marginLeft:8}}>{moment(task.endTime, 'YYYYMMDDHHmmssSSS').format('YYYY-MM-DD')}</span>
                      <span style={{marginLeft:8, color:item.completed?'green':'orange'}}>·{item.completed?'已完成':'未完成'}</span>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })
        }

        {
          !task.completed&&
          <Col span={8} style={{marginTop:16}}>
            <Card style={{textAlign:'center', height:140, padding:0, cursor:'pointer'}} bodyStyle={{padding:0}} onClick={()=>{
              if(onAddSubTask){
                onAddSubTask(task);
              }
            }}>
              <Icon style={{fontSize:48, lineHeight:'140px'}} type={'plus'} />
            </Card>
          </Col>
        }
      </Row>
    );
  }
}

export default SubTaskList;
