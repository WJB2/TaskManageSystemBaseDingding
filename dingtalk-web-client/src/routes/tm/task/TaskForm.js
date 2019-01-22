import React, {Component, createRef} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Tabs, Input, Button, Switch, Select, Row, Col, Slider, Icon, Form, Tag, DatePicker, Modal, Dropdown, Menu} from 'antd';
import DingTalkPC from 'dingtalk-jsapi';

import StaffSelector from  './../../../components/system/form/StaffSelector';
import ProjectSelector from  './../../../components/tm/task/ProjectSelector';
import TaskSelector from './../../../components/tm/task/TaskSelector';

import dingTalkStaffService from  './../../../services/dingtalk/DingTalkStaffService';
import projectService from  './../../../services/tm/ProjectService';

const {TabPane} = Tabs;
const {Search} = Input;
const {Option, OptGroup} = Select;
const FormItem = Form.Item;

import styles from './TaskIndex.less';
import TaskAddForm from "./TaskAddForm";
import TaskEditForm from "./TaskEditForm";
import TaskViewer from "./TaskViewer";
import fileService from "../../../services/system/FileService";
import ComponentUtils from "../../../../../dingtalk-mobile-client/src/utils/ComponentUtils";


const _CommentDialog = (props)=>{

  return (
    <Modal visible={props.visible}  title={"请输入说明"} onOk={props.onOk} onCancel={props.onCancel}>
      <Input.TextArea onChange={props.onChange} value={props.commentValue}/>
    </Modal>
  );
}

@connect(models => ({
  globalModel: models.global,
  taskModel: models['tm/task'],
}))
@Form.create({})
class TaskForm extends Component {

  constructor(props){
    super(props);
    this.taskAddFormRef = createRef();
    this.taskEditFormRef = createRef();
  }

  state={
    reachableVisible:false,
    unreachableVisible:false,
    commentValue: ''
  }

  onTaskAddFormRef(ref){
    this.taskAddFormRef = ref;
  }

  onTaskEditFormRef(ref){
    this.taskEditFormRef = ref;
  }

  async uploadImgFromPaste (file, type, isChrome) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('submission-type', type);
    const result = await fileService.uploadImageFromPaste(formData);

    if(this.props.taskModel.formType=='ADD'){
      this.taskAddFormRef.addImageInfo(result);
    }

    if(this.props.taskModel.formType=='EDIT'){
      this.taskEditFormRef.addImageInfo(result);
    }
  }

  pasteImage(event) {
    let isChrome = false;
    if ( event.clipboardData || event.originalEvent ) {
      let clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
      if ( clipboardData.items ) {
        // for chrome
        let  items = clipboardData.items,
          len = items.length,
          blob = null;
        isChrome = true;

        event.preventDefault();

        for (let i = 0; i < len; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            blob = items[i].getAsFile();
          }
        }
        if ( blob !== null ) {
          let reader = new FileReader();
          reader.onload =  (event) => {
            // event.target.result 即为图片的Base64编码字符串
            let base64_str = event.target.result;
            this.uploadImgFromPaste(base64_str, 'paste', isChrome);
          }
          reader.readAsDataURL(blob);
        }
      } else {
        //for firefox
        setTimeout(function () {
          let imgList = document.querySelectorAll('#tar_box img'),
            len = imgList.length,
            src_str = '',
            i;
          for ( i = 0; i < len; i ++ ) {
            if ( imgList[i].className !== 'my_img' ) {
              src_str = imgList[i].src;
            }
          }
          this.uploadImgFromPaste(src_str, 'paste', isChrome);
        }, 1);
      }
    } else {
      //for ie11
      setTimeout(function () {
        let imgList = document.querySelectorAll('#tar_box img'),
          len = imgList.length,
          src_str = '',
          i;
        for ( i = 0; i < len; i ++ ) {
          if ( imgList[i].className !== 'my_img' ) {
            src_str = imgList[i].src;
          }
        }
        this.uploadImgFromPaste(src_str, 'paste', isChrome);
      }, 1);
    }
  }

  componentWillMount()
  {
    document.addEventListener('paste', this.pasteImage.bind(this))
  }

  componentWillUnmount()
  {
    document.removeEventListener('paste', this.pasteImage)
  }

  handleFormSubmit(e){
    e.preventDefault();

    const {dispatch, taskModel, globalModel} = this.props;

    const {currentTask} = taskModel;

    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {

        values.beginTime=values.beginTime.format( 'YYYY-MM-DD');
        values.endTime=values.endTime.format( 'YYYY-MM-DD');

        if(currentTask&&currentTask.id){
          dispatch({
            type : 'tm/task/editTaskAsync',
            payload : {...values, id:currentTask?currentTask.id:null}
          });
        }else{
          dispatch({
            type : 'tm/task/addTaskAsync',
            payload : {...values, id:currentTask?currentTask.id:null}
          });
        }
      }
    });
  }

  async handleTaskNotification(){
    const {dispatch, taskModel, globalModel} = this.props;

    const {currentTask} = taskModel;

    const dingtalkUserIdList = await  dingTalkStaffService.convertStaffIdToDingtalkUserId({
      staffId : currentTask.assigneeIdList
    });

    DingTalkPC.biz.ding.post({
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

  handleTaskComplete(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/completeTaskAsync',
      payload : currentTask
    });
  }

  handleTaskRestart(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/restartTaskAsync',
      payload : currentTask
    });
  }

  handleTaskMarkUnreachableAction(){
    this.setState({
      unreachableVisible:true
    })
  }

  handleTaskMarkReachableAction(){
    this.setState({
      reachableVisible:true
    })
  }

  handleTaskMarkUnreachable(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/markTaskUnreachableAsync',
      payload : {
        taskId:currentTask.id,
        comment: this.state.commentValue
      }
    });

    this.setState({
      unreachableVisible:false,
      commentValue:''
    });
  }

  handleTaskMarkReachable(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/markTaskReachableAsync',
      payload : {
        taskId:currentTask.id,
        comment: this.state.commentValue
      }
    });

    this.setState({
      reachableVisible:false,
      commentValue:''
    });
  }

  handleTaskSuspend(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/suspendTaskAsync',
      payload : currentTask
    });
  }

  handleTaskResume(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/resumeTaskAsync',
      payload : currentTask
    });
  }

  handleTaskAudit(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/auditTaskAsync',
      payload : currentTask
    });
  }

  handleTaskRevokeAudit(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/revokeAuditTaskAsync',
      payload : currentTask
    });
  }

  handleTaskArchive(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/archiveTaskAsync',
      payload : currentTask
    });
  }

  handleTaskUnarchive(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/unarchiveTaskAsync',
      payload : currentTask
    });
  }

  handleTaskDelete(){
    const {dispatch, taskModel} = this.props;

    const {currentTask} = taskModel;

    dispatch({
      type : 'tm/task/deleteTaskAsync',
      payload : currentTask
    });
  }

  handleTaskFormCancel(){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/updateState',
      payload : {
        formVisible:false,
        currentTask:null
      }
    });
  }

  handleTaskComment(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/commentTask',
      payload
    });
  }

  handleAddSubTask(task){

    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/addSubTaskAction',
      payload : task
    });
  }

  handleEditSubTask(task){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskAction',
      payload : task
    });
  }

  handUploadFileFromPaste(payload){
    this.props.dispatch({
      type: 'tm/task/uploadImageFromPaste',
      payload
    })
  }

  async handleProjectChange(projectId){
    const project = await projectService.findProjectById({
      id:projectId
    });

    this.taskAddFormRef.onProjectChange({
      assigneeIdList: project.assigneeIdList,
      supervisorIdList : project.supervisorIdList,
    });
  }

  render() {
    const {dispatch, taskModel, globalModel} = this.props;

    const {currentTask, formType, taskOperateLogList, subTaskList, currentProject} = taskModel;

    const position = globalModel.position;

    let imAssignee = false;
    let imAuditor = false;

    if(currentTask&&((currentTask.assigneeIdList&&currentTask.assigneeIdList.indexOf(position.staffId)>=0))){
      imAssignee = true;
    }

    if(currentTask&&(((currentTask.auditorIdList&&currentTask.auditorIdList.indexOf(position.staffId)>=0)||
      ((currentTask.auditorIdList==null||currentTask.auditorIdList.length==0)&&imAssignee)))){
      imAuditor = true;
    }

    const { getFieldDecorator} = this.props.form;

    const task = currentTask||{};

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

    const modelConfigs = {
      width: 860,
      onOk : this.handleFormSubmit.bind(this),
      closable : false,
      centered:true,
      onCancel : ()=>{
        this.handleTaskFormCancel();
      }
    }

    const menus = (t)=>{
      return <Menu onClick={({key})=>{
        if(key=='suspend'){
          this.handleTaskSuspend();
        }

        if(key=='markUnreachable'){
          this.handleTaskMarkUnreachableAction();
        }

        if(key=='delete'){
          this.handleTaskDelete();
        }
      }}>
        {imAssignee&&!t.completed&&!t.suspended?<Menu.Item key={'suspend'}>挂起</Menu.Item>:null}
        {imAssignee&&!t.completed&&!t.unreachable&&!t.archived?<Menu.Item key={'markUnreachable'}>标记为无法完成</Menu.Item>:null}
        {imAssignee&&!t.completed&&!t.archived?<Menu.Item key={'delete'}>删除</Menu.Item>:null}
      </Menu>
    }

    return (
      <Modal maskClosable={false} visible={true} footer={null} {...modelConfigs} {...this.props} className={styles.taskForm} style={{float:'right', height:'100%'}} bodyStyle={{height:'100%'}}>
        <_CommentDialog visible={this.state.reachableVisible}
                        commentValue={this.state.commentValue}
                        onOk={this.handleTaskMarkReachable.bind(this)}
                        onCancel={()=>{this.setState({reachableVisible:false, commentValue:''})}}
                        onChange={(e)=>{this.setState({commentValue:e.target.value})}}/>
        <_CommentDialog visible={this.state.unreachableVisible}
                        commentValue={this.state.commentValue}
                        onOk={this.handleTaskMarkUnreachable.bind(this)}
                        onCancel={()=>{this.setState({unreachableVisible:false, commentValue:''})}}
                        onChange={(e)=>{this.setState({commentValue:e.target.value})}}/>
        <Form className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <div style={{marginLeft:24, cursor:'pointer', float:'left',  display:'flex'}}>
              <Form.Item style={{float:'left', flex:'none'}}>
                {
                  getFieldDecorator('projectId', {
                    rules: [{ required: false, message: '请选择项目' }],
                    initialValue: task.projectId,
                  })(<ProjectSelector onChange={this.handleProjectChange.bind(this)} disabled={formType==='PREVIEW'}/>)
                }
                </Form.Item>

              <FormItem style={{float:'left', flex:1, marginLeft:8}}>
                {getFieldDecorator('parentId', {
                  initialValue: task.parentId,
                })(
                  <TaskSelector style={{fontSize:10, verticalAlign:'bottom', lineHeight:'40px'}}/>
                )}
              </FormItem>
            </div>

            <div style={{float:'right'}}>
              {
                  formType==='ADD'&&<FormItem>
                    {getFieldDecorator('taskType', {
                      initialValue: task.taskType?task.taskType:'NORMAL',
                    })(
                      <Select placeholder="任务类型" style={{width:120, marginRight:8}}>
                        <Option value={'NORMAL'}>普通任务</Option>
                        <Option value={'CORPORATE'}>协作任务</Option>
                      </Select>
                    )}
                  </FormItem>
                }
              {
                !task.completed&&!task.suspended&&<div onClick={this.handleTaskNotification.bind(this)} className={styles.primaryBtnItem}><Icon type="notification" />&nbsp;&nbsp;催办</div>
              }
              {
                imAssignee&&formType==='EDIT'&&!task.completed&&!task.unreachable&&!task.suspended&&<div onClick={this.handleTaskComplete.bind(this)} className={styles.primaryBtnItem}><Icon type="check-circle-o" />&nbsp;&nbsp;标记完成</div>
              }
              {
                imAssignee&&formType==='EDIT'&&!task.completed&&task.unreachable&&!task.suspended&&<div onClick={this.handleTaskMarkReachableAction.bind(this)} className={styles.primaryBtnItem}><Icon type="check-circle-o" />&nbsp;&nbsp;标记为可以完成</div>
              }
              {
                imAssignee&&formType==='PREVIEW'&&task.completed&&!task.audited&&<div onClick={this.handleTaskRestart.bind(this)} className={styles.primaryBtnItem}><Icon type="caret-right" />&nbsp;&nbsp;重启任务</div>
              }
              {
                imAssignee&&formType==='EDIT'&&!task.completed&&task.suspended&&<div onClick={this.handleTaskResume.bind(this)} className={styles.primaryBtnItem}><Icon type="caret-right" />&nbsp;&nbsp;恢复</div>
              }
              {
                imAuditor&&formType=='PREVIEW'&&task.completed&&!task.audited&&<div onClick={this.handleTaskAudit.bind(this)} className={styles.primaryBtnItem}><Icon type="check-circle" />&nbsp;&nbsp;完成审核</div>
              }
              {
                imAuditor&&formType=='PREVIEW'&&task.completed&&task.audited&&!task.archived&&<div onClick={this.handleTaskRevokeAudit.bind(this)} className={styles.primaryBtnItem}><Icon type="close-circle" />&nbsp;&nbsp;撤销审核</div>
              }
              {
                imAssignee&&formType==='PREVIEW'&&task.audited&&!task.archived&&<div onClick={this.handleTaskArchive.bind(this)} className={styles.primaryBtnItem}><Icon type="folder-add" />&nbsp;&nbsp;归档</div>
              }
              {
                imAssignee&&formType==='PREVIEW'&&task.audited&&task.archived&&<div onClick={this.handleTaskUnarchive.bind(this)} className={styles.primaryBtnItem}><Icon type="folder-open" />&nbsp;&nbsp;回档</div>
              }
              {
                (formType=='EDIT'||formType=='PREVIEW')&&<Dropdown overlay={menus(task)} className={styles.primaryBtnItem}><span ><Icon type="profile" />&nbsp;&nbsp;更多&nbsp;<Icon type="down" /></span></Dropdown>
              }
            </div>
          </div>
          <div className={styles.formBodyWrapper}>
            <div className={styles.formBody}>
              {
                formType==='ADD' && <TaskAddForm styles={styles} project={currentProject} task={task} uploadFileFn={this.handUploadFileFromPaste.bind(this)} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} onRef={this.onTaskAddFormRef.bind(this)}/>
              }
              {
                formType==='EDIT' && <TaskEditForm styles={styles}
                                                   task={task}
                                                   onEdit={this.handleEditSubTask.bind(this)}
                                                   subTaskList={subTaskList||[]}
                                                   taskOperateLogList={taskOperateLogList||[]}
                                                   getFieldDecorator={getFieldDecorator}
                                                   formItemLayout={formItemLayout}
                                                   onComment={this.handleTaskComment.bind(this)}
                                                   onAddSubTask={this.handleAddSubTask.bind(this)}
                                                   currentStaffId={position.staffId}
                                                   onRef={this.onTaskEditFormRef.bind(this)}
                />
              }
              {
                formType==='PREVIEW' && <TaskViewer styles={styles} task={task}
                                                    taskOperateLogList={taskOperateLogList||[]}
                                                    getFieldDecorator={getFieldDecorator}
                                                    formItemLayout={formItemLayout}
                                                    onComment={this.handleTaskComment.bind(this)}
                                                    currentStaffId={position.staffId}
                />
              }
            </div>
          </div>
          <div className={styles.formFooter}>
            <Row gutter={16}>
              <Col span={12}>
                {formType!=='PREVIEW'&&<Button size={"large"} type={'primary'} style={{width:'100%'}} onClick={this.handleFormSubmit.bind(this)}>保存</Button>}
              </Col>
              <Col span={formType!=='PREVIEW'?12:24}>
                <Button size={"large"} style={{width:'100%'}} onClick={this.handleTaskFormCancel.bind(this)}>{formType!=='PREVIEW'?'取消':'关闭'}</Button>
              </Col>
            </Row>
          </div>
      </Form>
      </Modal>
    );
  }
}

export default TaskForm;
