import React,{PureComponent} from 'react';

import {WhiteSpace,TabBar} from 'antd-mobile';

import styles from './ProfileIndex.less';

import {connect} from 'dva';

import TabBarConfig from "../../config/TabBarConfig";


import TabBarHandler from '../../components/main/TabBarHandler';
import HeaderHandler from '../../components/main/HeaderHandler';

import ProfileTag from './ProfileTag';
import TaskSuspendedList from './TaskSuspendedList';
import ProfilePane from './ProfilePane';
import TaskArchivedList from './TaskArchivedList';
import TaskGroupIndex from './TaskGroupIndex';
import TaskGroupForm from './TaskGroupForm';

import TaskForm from '../../routes/task/TaskForm';

import DingTalkUtils from '../../utils/DingTalkUtils';

@connect(models=>({
  globalModel:models['global'],
  profileModel:models['profile/profile'],
  taskModel:models['task/task']
}))
class ProfileIndex extends PureComponent{

  componentWillMount(){
    const { dispatch }=this.props;

    dispatch({
      type:'profile/profile/loadTagPageAsync',
    })


    dispatch({
      type:'profile/profile/loadTaskGroupPageAsync'
    })

  }

  handleSkip(path){

    const {dispatch}=this.props;

    dispatch({
      type:'global/forwardDestroy',
      payload:{
        path:path,
      }
    })
  }

  showProfileHandler(){//展示标签
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{
        tabBarVisible:false,
        paneVisible:false,
        tagPaneVisible:true,
        centerNavBarVisible:true,
        navBarTitle:'我的标签'
      }
    })
  }

  showSuspendedHandler(){//展示挂起任务

    const {dispatch}=this.props;

    console.log('点击挂起')

    dispatch({
      type:'profile/profile/loadSuspended',
      payload:{}
    })
  }

  showArchivedHandler(){//展示归档任务
    const {dispatch}=this.props;

    dispatch({
      type:'profile/profile/loadArchived',
      payload:{}
    })

  }

  showGroupHandler(){//展示群组
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{

        tabBarVisible:false,
        paneVisible:false,
        groupVisible:true

      }
    })
  }

  handleTaskTagAddAction(){//展现组件

    const {dispatch}=this.props;

    dispatch({
      type:'profile/profile/updateState',

      payload:{

        staffAddComponentVisible:true,
        taskTagFormType:'ADD',

      }
    })
  }

  handleRadioChange(e){//标签选择
    console.log()
  }

  handleTaskTagEditAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'profile/profile/editTaskTagAction',
      payload:payload
    });
  }

  handleTaskTagFormSubmit(payload){//提交标签
    const {dispatch} = this.props;

    if(payload.id){
      dispatch({
        type : 'profile/profile/editTaskTagAsync',
        payload: payload
      });
    }else{
      dispatch({
        type : 'profile/profile/addTaskTagAsync',
        payload: payload
      });
    }
  }

  handleTaskTagDeleteAction(payload){

    const {dispatch} = this.props;

    dispatch({
      type : 'profile/profile/deleteTaskTagAsync',
      payload:payload
    });
  }

  handleTaskGroupEditAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'profile/profile/editTaskGroupAction',
      payload:payload
    });
  }

  handleTaskGroupFormSubmit(payload){
    const {dispatch} = this.props;

    if(payload.id){
      dispatch({
        type : 'profile/profile/editTaskGroupAsync',
        payload: payload
      });
    }else{
      dispatch({
        type : 'profile/profile/addTaskGroupAsync',
        payload: payload
      });
    }
  }

  handleTaskGroupDeleteAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'profile/profile/deleteTaskGroupAsync',
      payload:payload
    });
  }

  handleTaskGroupAddAction(payload){//点击增加群组按钮
    const {dispatch} = this.props;

    dispatch({
      type : 'profile/profile/updateState',
      payload:{
        taskGroupFormVisible:true,
        taskGroupFormType:'ADD',
        groupVisible:false,
        currentTaskGroup:null
      }
    });
  }

  handleGroupBack(){
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{
        taskGroupFormVisible:false,
        taskGroupFormType:undefined,
        groupVisible:true,
      }
    })
  }

  editActionHandler(payload){//点击进入对应表单

    const {dispatch} = this.props;

    console.log('点击进入对应表单')

    dispatch({
      type : 'task/task/editTaskAction',
      payload:{
        ...payload,
      },
    });
  }

  suspendCancel(){
    const {dispatch}=this.props;
    console.log('aa')
    dispatch({
      type:'profile/profile/updateState',
      payload:{

        tabBarVisible:true,
        paneVisible:true,
        taskSuspendedVisible:false,

      }
    })
  }

  archivedCancel(){
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{
        tabBarVisible:true,
        paneVisible:true,
        taskArchivedVisible:false,
      }
    })
  }

  tagCancel(){
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{
        tabBarVisible:true,
        paneVisible:true,
        tagPaneVisible:false,
      }
    })
  }

  groupCancel(){
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{
        tabBarVisible:true,
        paneVisible:true,
        groupVisible:false,
      }
    })
  }


  render(){

    const { profileModel,taskModel, globalModel }=this.props;

    const {currentLoadingTabBar,tagPaneVisible,navBarTitle,centerNavBarVisible,
      endNavBarVisible,staffAddComponentVisible,staffComponentDefault,
      data,currentTaskTag,taskTagFormType,loadSuspended,taskSuspendedVisible,
      suspendData,tabBarVisible,paneVisible,archivedData,taskArchivedVisible,groupVisible,taskGroupFormVisible,taskGroupFormType,currentTaskGroup,groupList
    }=profileModel;

    const tabbarConfig={//标签栏设置
      value:'profile',
      currentLoadingTabBar:currentLoadingTabBar,
      handleSkip:this.handleSkip.bind(this),
    }

    const tagConfig={
      data:data,
      currentTaskTag:currentTaskTag,
      taskTagFormType:taskTagFormType,
      onDelete:this.handleTaskTagDeleteAction.bind(this),
      staffComponentDefault:staffComponentDefault,
      onAdd:this.handleTaskTagAddAction.bind(this),
      onEdit:this.handleTaskTagEditAction.bind(this),
      onSubmit:this.handleTaskTagFormSubmit.bind(this),
      staffAddComponentVisible:staffAddComponentVisible,
      onChangeRadio:this.handleRadioChange.bind(this),
      onBack:this.tagCancel.bind(this)
    }

    const suspendedConfig={
      suspendData:suspendData,
      onEdit:this.editActionHandler.bind(this),
      onBack:this.suspendCancel.bind(this),
    }

    const archivedConfig={
      archivedData:archivedData,
      onEdit:this.editActionHandler.bind(this),
      onBack:this.archivedCancel.bind(this),
    }

    const paneConfig={
      position: globalModel.position,
      onShowTag:this.showProfileHandler.bind(this),
      onShowSuspended:this.showSuspendedHandler.bind(this),
      onShowArchived:this.showArchivedHandler.bind(this),
      onShowGroup:this.showGroupHandler.bind(this),
    }

    const groupConfig={
      onEdit:this.handleTaskGroupEditAction.bind(this),
      onAdd:this.handleTaskGroupAddAction.bind(this),
      groupList:groupList,
      onBack:this.groupCancel.bind(this),
    }

    const groupFormConfig={
      formType:taskGroupFormType,
      currentTaskGroup:currentTaskGroup,
      onSubmit:this.handleTaskGroupFormSubmit.bind(this),
      onDelete:this.handleTaskGroupDeleteAction.bind(this),
      onBack:this.handleGroupBack.bind(this)
    }


    return(
      <div className={styles.profileIndex}>

        {/*<Header {...headerConfig}/>*/}

        { taskSuspendedVisible && <TaskSuspendedList {...suspendedConfig}/>}

        { taskArchivedVisible && <TaskArchivedList {...archivedConfig}/>}

        { tagPaneVisible && <ProfileTag {...tagConfig} />}

        { groupVisible && <TaskGroupIndex {...groupConfig}/>}

        { paneVisible && <ProfilePane {...paneConfig}/>}

        { tabBarVisible && <TabBarHandler {...tabbarConfig}/>}

        { taskGroupFormVisible && <TaskGroupForm {...groupFormConfig}/>}

      </div>
    );
  }
}
export default ProfileIndex;
