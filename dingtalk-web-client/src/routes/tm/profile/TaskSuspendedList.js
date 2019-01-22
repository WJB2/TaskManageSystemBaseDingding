import React, {PureComponent} from 'react';
import moment from 'moment';
import {List} from 'antd';


const  ListItem = List.Item;

class TaskSuspendedList extends PureComponent {

  render() {
    const {taskList, pagination, onEdit} = this.props;

    const taskItemRender = (task)=>{

      return (
        <ListItem style={{backgroundColor:"#fff", marginTop:16, padding:8, paddingLeft:24, position:'relative', display:'block', flex:'none', cursor:'pointer'}} onClick={()=>{
          onEdit(task);
        }}>
          <div style={{flex:'none', width:'100%', backgroundColor:'rgb(242,245,247)', borderRadius:5, padding:16, paddingTop:8}}>
            <div style={{width:'100%', lineHeight:'32px', fontWeight:'bold'}}>{task.title}</div>
            <div style={{width:'100%', fontSize:12}}>
              <div style={{float:'left'}}>
                <div style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width:20,height:20, borderRadius:10, fontSize:10, textAlign:'center', lineHeight:'20px', display:'inline-block' }} >责</div>
                <span style={{marginLeft:8}}>{task.assigneeList?task.assigneeList.map(item=>item.name).join('、'):''}</span>
              </div>
              <div style={{float:'right'}}>挂起时间：{moment(task.suspendedTime, 'YYYYMMDDHHmmssSSS').format("YYYY-MM-DD HH:mm:ss")}</div>
            </div>
          </div>
        </ListItem>
      );
    };

    return (
      <List
        dataSource={taskList}
        pagination={pagination}
        renderItem={
        taskItemRender
      }
        style={{padding:16}}
      />
    );
  }
}

export default TaskSuspendedList;
