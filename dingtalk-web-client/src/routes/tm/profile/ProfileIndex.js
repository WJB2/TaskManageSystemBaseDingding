import React, {Component} from 'react';
import {Row, Col, Avatar, Menu} from 'antd';
import AutoSizer from 'react-virtualized-auto-sizer';
import {connect} from "dva/index";
import TaskSuspendedList from "./TaskSuspendedList";
import TaskArchivedList from "./TaskArchivedList";
import TaskTagIndex from "./TaskTagIndex";
import TaskTagForm from "./TaskTagForm";
import TaskGroupIndex from "./TaskGroupIndex";
import TaskGroupForm from "./TaskGroupForm";

const MenuItem = Menu.Item;

@connect(models => ({
  globalModel: models.global,
  profileModel: models['tm/profile'],
}))
class ProfileIndex extends Component {

  componentWillMount(){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/loadSuspended',
      payload:{}
    });
  }

  handleTaskTagAddAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/updateState',
      payload:payload
    });
  }

  handleTaskTagEditAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/editTaskTagAction',
      payload:payload
    });
  }

  handleTaskTagDeleteAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/deleteTaskTagAsync',
      payload:payload
    });
  }

  handleTaskTagFormSubmit(payload){
    const {dispatch} = this.props;

    if(payload.id){
      dispatch({
        type : 'tm/profile/editTaskTagAsync',
        payload: payload
      });
    }else{
      dispatch({
        type : 'tm/profile/addTaskTagAsync',
        payload: payload
      });
    }
  }

  handleTaskTagFormCancelAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/updateState',
      payload:{
        taskTagFormVisible:false,
        taskTagFormType:null,
        currentTaskTag:null,
      }
    });
  }

  handleTaskGroupAddAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/updateState',
      payload:payload
    });
  }

  handleTaskGroupEditAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/editTaskGroupAction',
      payload:payload
    });
  }

  handleTaskGroupDeleteAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/deleteTaskGroupAsync',
      payload:payload
    });
  }

  handleTaskGroupFormSubmit(payload){
    const {dispatch} = this.props;

    if(payload.id){
      dispatch({
        type : 'tm/profile/editTaskGroupAsync',
        payload: payload
      });
    }else{
      dispatch({
        type : 'tm/profile/addTaskGroupAsync',
        payload: payload
      });
    }
  }

  handleTaskGroupFormCancelAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/profile/updateState',
      payload:{
        taskGroupFormVisible:false,
        taskGroupFormType:null,
        currentTaskGroup:null,
      }
    });
  }

  handleTaskEdit(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskAction',
      payload:payload
    });
  }

  render(){

    const {profileModel, globalModel, dispatch} = this.props;

    const {tabKey, data, tagList, taskTagFormType, currentTaskTag, taskTagFormVisible,
      groupList, taskGroupFormType, currentTaskGroup, taskGroupFormVisible} = profileModel;

    return (
      <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
        <div style={{height:60, lineHeight:'60px', paddingLeft:16, backgroundColor:'#fff'}}>
          个人中心
        </div>
        <div style={{flex:1, backgroundColor:'rgb(242, 245, 247)', width:'100%', padding:16}}>
          <AutoSizer>
            {
              ({width, height})=>{
                return (
                  <div style={{width:width, height:height, overflow:'auto', display:'flex'}}>
                    <div style={{width:180, marginRight:8}}>
                      <div style={{backgroundColor:'#fff'}}>
                        <div style={{textAlign:'center', paddingTop:32}}>
                          <Avatar size={64} icon="user" />
                        </div>
                        <div style={{padding:16, fontSize:14}}>
                          <div style={{width:'50%', float:'left', textAlign:'center'}}>
                            任务总数<br/>
                            <span style={{lineHeight:'24px'}}>0</span>
                          </div>
                          <div style={{width:'50%', float:'left', textAlign:'center'}}>
                            今日任务<br/>
                            <span style={{lineHeight:'24px'}}>0</span>
                          </div>
                          <div style={{clear:'both'}}></div>
                        </div>
                      </div>

                      <div style={{backgroundColor:'#fff', marginTop:8}}>
                        <Menu defaultSelectedKeys={["tabKey"]} selectedKeys={[tabKey]} onClick={({key})=>{
                            if(key==='suspended'){
                              dispatch({
                                type : 'tm/profile/loadSuspended',
                                payload:{
                                  page:1
                                }
                              });
                            }else if(key==='archived'){
                              dispatch({
                                type : 'tm/profile/loadArchived',
                                payload:{
                                  page:1
                                }
                              });
                            }else if(key==='tag'){
                              dispatch({
                                type : 'tm/profile/loadTagPageAsync',
                                payload:{
                                }
                              });
                            }else if(key==='group'){
                              dispatch({
                                type : 'tm/profile/loadTaskGroupPageAsync',
                                payload:{
                                }
                              });
                            }
                        }}>
                          <MenuItem  key="suspended">我的挂起</MenuItem>
                          <MenuItem  key="archived">我的归档</MenuItem>
                          <MenuItem  key="tag">我的标签</MenuItem>
                          <MenuItem  key="group">我的群组</MenuItem>
                        </Menu>
                      </div>
                    </div>
                    <div style={{flex:1, backgroundColor:'#fff'}}>
                      {
                        tabKey==='suspended' && <TaskSuspendedList taskList={tabKey==='suspended'?data.list:[]} onEdit={this.handleTaskEdit.bind(this)}/>
                      }
                      {
                        tabKey==='archived' && <TaskArchivedList taskList={tabKey==='archived'?data.list:[]}  onEdit={this.handleTaskEdit.bind(this)}/>
                      }
                      {
                        tabKey==='tag' && <TaskTagIndex onAdd={this.handleTaskTagAddAction.bind(this)} tagList={tagList} onEdit={this.handleTaskTagEditAction.bind(this)} />
                      }
                      {
                        tabKey==='group' && <TaskGroupIndex onAdd={this.handleTaskGroupAddAction.bind(this)} groupList={groupList} onEdit={this.handleTaskGroupEditAction.bind(this)} />
                      }
                    </div>
                  </div>
                );
              }
            }
          </AutoSizer>
        </div>
        {
          taskTagFormVisible&&
          <TaskTagForm formType={taskTagFormType}
                       currentTaskTag={currentTaskTag}
                       onCancel={this.handleTaskTagFormCancelAction.bind(this)}
                       onSubmit={this.handleTaskTagFormSubmit.bind(this)}
                       onDelete = {this.handleTaskTagDeleteAction.bind(this)}
          />
        }
        {
          taskGroupFormVisible&&
          <TaskGroupForm formType={taskGroupFormType}
                       currentTaskGroup={currentTaskGroup}
                       onCancel={this.handleTaskGroupFormCancelAction.bind(this)}
                       onSubmit={this.handleTaskGroupFormSubmit.bind(this)}
                       onDelete = {this.handleTaskGroupDeleteAction.bind(this)}
          />
        }
      </div>
    );
  }
}

export default ProfileIndex;
