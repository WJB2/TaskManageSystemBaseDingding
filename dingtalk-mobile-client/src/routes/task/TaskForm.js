import React,{PureComponent} from 'react';

import { Slider,List,DatePicker,TextareaItem,TabBar,Toast,Modal,ActionSheet } from 'antd-mobile';

import { createForm } from 'rc-form';
import moment from 'moment';

import HeaderHandler from '../../components/main/HeaderHandler';


import TabBarHandler from '../../components/main/TabBarHandler';

import styles from './TaskIndex.less';

import TabBarConfig from '../../config/TabBarConfig';
import ComponentUtils from '../../utils/ComponentUtils';
import DingTalkUtils from '../../utils/DingTalkUtils';

import TaskAddForm from './TaskAddForm';
import TaskEditForm from './TaskEditForm';
import TaskViewer from './TaskViewer';

import {connect} from 'dva';
import dingTalkStaffService from "../../services/dingtalk/DingTalkStaffService";
import DingTalkMobile from 'dingtalk-jsapi';


const alert=Modal.alert;
const operation=Modal.operation;

@connect(models=>({
  globalModel:models.global,
  taskModel:models['task/task'],
}))
@createForm({
  onValuesChange:async (props,changedValues,allValues)=>{


    if(typeof(changedValues[Object.keys(changedValues).toString()])!=="undefined"){
      props.dispatch({
        type:'task/task/updateState',
        payload:{
          isEdit:true,
        }
      })
    }
    console.log(changedValues)
    console.log(allValues)
  }
})
class TaskForm extends PureComponent{

  state={
    assigneeIdList:null,
    participatorIdList:null
  }

  componentDidMount(){

    const {dispatch,taskModel}=this.props;

    const {formType,currentTask}=taskModel;

    document.addEventListener('backbutton',(e)=>{
      e.preventDefault();

      dispatch({
        type:'task/task/updateState',
        payload:{

          formVisible:false,

        }
      })
    })

  }



  handleAugmentChange(values,name){
    this.props.form.setFieldsValue({
      [name]:values,
    })
  }

  handleSubmitForm(e){

    e.preventDefault();

    const {dispatch, taskModel} = this.props;

    const { currentTask,formType } = taskModel;

    this.props.form.validateFields((error,values)=>{


      if(!values.title){
        Toast.fail('请填写标题');
        return;
      }else if(!values.taskType){
        Toast.fail('请选择任务类型')
        return;
      }else if(!values.assigneeIdList){
        Toast.fail('请选择责任人')
        return;
      }else if(!values.supervisorIdList){
        Toast.fail('请选择关注人')
        return;
      }else if(!values.projectId){
        Toast.fail('请选择项目')
        return;
      }

      if(currentTask){

      }else if(!currentTask){
        if(!values.participatorIdList){
          Toast.fail('请选择参与人')
          return;
        }
      }

      if(values.beginTime){
        values.beginTime=ComponentUtils.getDateFormat(values.beginTime)
      }else if(!values.beginTime){
        values.beginTime=ComponentUtils.getDateFormat(new Date())
      }

      if(values.endTime){
        values.endTime=ComponentUtils.getDateFormat(values.endTime);
      }else if(!values.endTime){
        values.endTime=ComponentUtils.getDateFormat(new Date())
      }

      if(!error){
        if(currentTask&&currentTask.id){
          dispatch({
            type:'task/task/editTaskAsync',
            payload:{
              ...values,id:currentTask?currentTask.id:null
            }
          });
        }else{
          dispatch({
            type:'task/task/addTaskAsync',
            payload:{
              ...values,id:currentTask?currentTask.id:null
            }
          })
        }
      }
    })

  }

  handleClickEdit(){//编辑界面点击右边导航栏

    const {currentTask}=this.props.taskModel;

    const BUTTONS=['任务挂起','删除','取消'];

    ActionSheet.showActionSheetWithOptions({
        options:BUTTONS,
        cancelButtonIndex:BUTTONS.length-1,
        destructiveButtonIndex: BUTTONS.length - 2,
        title:'请选择操作'
      },
      (buttonIndex)=>{
      console.log(BUTTONS[buttonIndex])
        if(BUTTONS[buttonIndex]==="任务挂起"){
          this.handleTaskSuspend()
        }else if(BUTTONS[buttonIndex]==="删除"){
          this.handleTaskDelete()
        }
      })
  }

  handleClickView(){//查看界面点击导航栏
    const BUTTONS=['删除','取消'];

    ActionSheet.showActionSheetWithOptions({
        options:BUTTONS,
        cancelButtonIndex:BUTTONS.length-1,
        destructiveButtonIndex:BUTTONS.LENGTH-2,
        title:'请选择操作'
      },
      (buttonIndex)=>{
        if(BUTTONS[buttonIndex]==="删除"){
          this.handleTaskDelete()
        }
      })
  }

  handleTaskAudit(){//任务审核
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/auditTaskAsync',
      payload : currentTask
    });
  }

  handleTaskRevokeAudit(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/revokeAuditTaskAsync',
      payload : currentTask
    });
  }

  handlePress(title){//任务部分按下标签栏

    const {dispatch,taskModel}=this.props;

    const {currentTask}=taskModel;

    if(title=="标记完成"){

      this.handleTaskComplete();

    }else if(title=="重新开启"){

      this.handleTaskRestart();

    }else if(title=="归档"){

      alert('提示','是否归档该任务',[
        {text:'取消',onPress:console.log('归档')},
        {text:'确定',onPress:()=>{this.handleTaskArchive()}}
      ])


    }else if(title=="回档"){

      alert('提示','是否回档该任务',[
        {text:'取消',onPress:console.log('回档')},
        {text:'确定',onPress:()=>{this.handleTaskUnarchive()}}
      ])

    }else if(title=="恢复"){

      this.handleTaskResume();

    }else if(title==="发起会议"){

    }else if(title==="催办"){

      alert('提示','是否催办',[
        {text:'取消',onPress:console.log('催办')},
        {text:'确定',onPress:()=>{this.handleTaskNotification()}}
      ])

    }else if(title==="建子任务"){
      this.handleAddSubTask()
    }else if(title==="删除"){
      alert('提示','是否删除',[
        {text:'取消',onPress:()=>{console.log('删除')}},
        {text:'确定',onPress:()=>{this.handleTaskDelete()}}
      ])
    }else if(title==="挂起"){

      if(currentTask.suspended){
        Toast.info('当前任务已挂起,不可再挂起');
      }else{
        alert('提示','是否挂起',[
          {text:'取消',onPress:console.log('挂起')},
          {text:'确定',onPress:()=>{this.handleTaskSuspend()}}
        ])
      }

    }else if(title==="审核"){
      this.handleTaskAudit()
    }else if(title==="撤销审核"){
      this.handleTaskRevokeAudit()
    }else if(title==="跟进讨论"){
      dispatch({
        type:'task/task/updateState',
        payload:{
          discussVisible:true
        }
      })
    }
  }

  handleTaskComplete(){//任务完成

    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/completeTaskAsync',
      payload : currentTask
    });
  }

  handleTaskRestart(){//重启任务
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/restartTaskAsync',
      payload : currentTask
    });
  }

  handleAddSubTask(){//新建子任务
    const {dispatch,taskModel} = this.props;

    const {currentTask}=taskModel;

    const { setFieldsValue }=this.props.form;

    setFieldsValue({title:'',content:''})

    dispatch({
      type : 'task/task/addSubTaskAction',
      payload : currentTask
    });
  }

  handleTaskArchive(){//任务归档

    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/archiveTaskAsync',
      payload : currentTask
    });

  }

  handleTaskUnarchive(){//任务回档
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/unarchiveTaskAsync',
      payload : currentTask
    });

  }

  handleTaskSuspend(){//任务挂起

    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/suspendTaskAsync',
      payload : currentTask
    });

  }

  handleTaskResume(){//任务继续

    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/resumeTaskAsync',
      payload : currentTask
    });

  }

  handleTaskDelete(){//刪除任务
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'task/task/deleteTaskAsync',
      payload : currentTask
    });

  }

  handleClickDate(isChange){
    if(isChange){
      Toast.info('不能点我',1);
      return null;
    }
  }

  handleBack(){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        formVisible:false,
      }
    })
  }

  async handleTaskNotification(){
    const {dispatch, taskModel, globalModel} = this.props;

    const {currentTask} = taskModel;

    const dingtalkUserIdList = await  dingTalkStaffService.convertStaffIdToDingtalkUserId({
      staffId : currentTask.assigneeIdList
    });

    DingTalkMobile.biz.ding.post({
      users: dingtalkUserIdList,
      corpId:globalModel.corpId,
      type: 1,
      alertType:2,
      alertDate:{
        "format":"yyyy-MM-dd HH:mm",
        "value" : moment().format("YYYY-MM-DD HH:mm")
      },
      text: currentTask.title,
      bizType : 0
    });
  }

  downloadFile(payload){
    const {dispatch}=this.props;
    console.log(payload)
    dispatch({
      type:'task/task/downloadFile',
      payload:{
        id:payload
      }
    })
  }

  handleCancelDiscuss(){
    const {dispatch}=this.props;
    dispatch({
      type:"task/task/updateState",
      payload:{
        discussVisible:false,
      }
    })
  }



  render(){
    const {  taskModel,dispatch,globalModel }=this.props;

    const { currentTask,formType,completedBanner,suspendBanner,archivedBanner,taskOperateLogList,isEdit,discussVisible}=taskModel;

    const { getFieldProps, getFieldsValue,getFieldDecorator,setFieldsValue,onFieldsChange,getFieldValue }=this.props.form;

    const task=currentTask || {};

    const tabbarConfig={
      currentLoadingTabBar:task.archived?'tabBarTaskArchivedList':task.audited?'tabBarTaskAuditedList':task.completed?'tabBarTaskCompletedList':task.suspended?'tabBarTaskSuspend':"tabBarTaskList",
      onPress:this.handlePress.bind(this),
    }

    console.log(task);

    return(
      <div  className={styles.taskForm} >

        { task.completed && <div className={styles.taskformcompleted}>已完成</div> }

        { task.suspended && <div className={styles.taskformsuspended}>已挂起</div> }

        { task.archived && <div className={styles.taskformarchived}>已归档</div> }

        { task.audited && <div className={styles.taskformaudited}>已审核</div>}

        <div className={styles.wrapperForm}>

          {
            formType==="ADD" && <TaskAddForm
              getFieldDecorator={getFieldDecorator} getFieldProps={getFieldProps}
              setFieldsValue={setFieldsValue}
              assigneeIdList={this.state.assigneeIdList?this.state.assigneeIdList:null}
              participatorIdList={this.state.participatorIdList?this.state.participatorIdList:null}
              getFieldValue={getFieldValue}
              onBack={this.handleBack.bind(this)}
              handleAugmentChange={this.handleAugmentChange.bind(this)}
              globalModel={globalModel}
              getFieldsValue={getFieldsValue}
              task={task}
              />
          }

          {
            formType==="EDIT" && <TaskEditForm
              getFieldDecorator={getFieldDecorator} getFieldProps={getFieldProps}
              taskOperateLogList={taskOperateLogList?taskOperateLogList:[]}
              onFieldsChange={onFieldsChange}
              getFieldValue={getFieldValue}
              onBack={this.handleBack.bind(this)}
              {...this.props.form}
              onAddSubTask={this.handleAddSubTask.bind(this)}
              handleClickEdit={this.handleClickEdit.bind(this)}
              downloadFile={this.downloadFile.bind(this)}
              task={task}
              discussVisible={discussVisible}
              onCancelDiscuss={this.handleCancelDiscuss.bind(this)}/>
          }

          {
            formType==="PREVIEW" && <TaskViewer
              onBack={this.handleBack.bind(this)}
              getFieldValue={getFieldValue}
              getFieldDecorator={getFieldDecorator} getFieldProps={getFieldProps}
              onHandleClickView={this.handleClickView.bind(this)}
              downloadFile={this.downloadFile.bind(this)}
              task={task} />
          }

        </div>

        {formType==="EDIT"||formType==="PREVIEW"?<div className={styles.taskbottom}><TabBarHandler {...tabbarConfig}/></div>:null}

        {
          formType==="EDIT" && isEdit && <div className={styles.editbutton}>
            <div onClick={(e)=>{
              this.handleSubmitForm(e)
            }}>保存</div>
            <div>删除</div>
          </div>
        }

        {formType==="ADD"?<div className={styles.taskAddButton} onClick={(e)=>{
          this.handleSubmitForm(e)
        }}>保存</div>:null}

      </div>
    )
  }
}

export default TaskForm;
