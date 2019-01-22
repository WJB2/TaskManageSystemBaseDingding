import React,{PureComponent} from 'react';

import { List,TextareaItem,DatePicker,Button,InputItem,WhiteSpace } from 'antd-mobile';

import { createForm } from 'rc-form';

import {routerRedux} from 'dva/router';

import ComponentUtils from '../../utils/ComponentUtils';

import QueueAnim from 'rc-queue-anim';
import BannerAnim, { Element } from 'rc-banner-anim';

import styles from './ProjectIndex.less';

import ProjectStaffSelector from '../../components/project/ProjectStaffSelector';
import LabelListSelector from '../../components/project/LabelListSelector';
import OrganizationSelector from '../../components/project/OrganizationSelector';

import HeaderHandler from '../../components/main/HeaderHandler';

import DingTalkUtils from '../../utils/DingTalkUtils';
import  moment  from 'moment';

import {connect} from 'dva';
import {ActionSheet} from "antd-mobile/lib/index";
const Item=List.Item;

@connect(models=>({
  globalModel:models.global,
  projectModel:models['project/project'],
}))
class ProjectForm extends PureComponent{

  componentWillMount(){
    const {dispatch}=this.props;
    document.addEventListener('backbutton',function(e){
      e.preventDefault();
      dispatch({
        type:'project/project/updateState',
        payload:{
          formVisible:false,
          currentProject:null,
          formType:'ADD',
        }
      })
    })
  }

  handleSubmit(e){

    const {dispatch,projectModel}=this.props;

    const { currentProject }=projectModel;

    this.props.form.validateFields((error,values)=>{

      values.beginTime=ComponentUtils.getDateFormat(values.beginTime);
      values.endTime=ComponentUtils.getDateFormat(values.endTime);

      if(!error){
        if(currentProject&&currentProject.id){
          dispatch({
            type:'project/project/editProjectAsync',
            payload:{
              ...values,id:currentProject?currentProject.id:null
            }
          });
        }else{
          dispatch({
            type:'project/project/addProjectAsync',
            payload:{
              ...values,
            }
          })
        }
      }
    })
  }

  handleSelect(){//点击选择弹出对话框
    const {dispatch,project}=this.props;
    dispatch({
      type:'project/project/updateState',
      payload:{
        staffselectvisible:false,
      }
    })
    dispatch({
      type:'system/staff/queryStaffPageAsync',
    })
  }

  handleBack(){
    const {dispatch}=this.props;
    dispatch({
      type:'project/project/updateState',
      payload:{
        formVisible:false,
        tabBarVisible:true,
        listVisible:true,
        buttonVisible:true
      }
    })
  }

  handleDelete(payload){
    const {dispatch}=this.props;

    dispatch({
      type:'project/project/deleteProjectByIdAsync',
      payload:{
        id:payload.id
      }
    })

  }

  handleCancelForm(){
    const {dispatch}=this.props;
    dispatch({
      type:'project/project/updateState',
      payload:{
        formVisible:false,
      }
    })
  }

  deleteProject(payload){
    const {dispatch}=this.props;
    dispatch({
      type:'project/project/deleteProjectByIdAsync',
      payload:{
        ...payload
      }
    })
  }

  handlePop(){
    const { dispatch,projectModel }=this.props;

    const { currentProject }=projectModel;

    const BUTTONS=['删除项目','取消'];

    ActionSheet.showActionSheetWithOptions({
      options:BUTTONS,
      cancelButtonIndex:BUTTONS.length-1,
      title:'请选择操作',
    },(buttonIndex)=>{
      if(BUTTONS[buttonIndex]==="删除项目"){
        this.deleteProject(currentProject)
      }
    })
  }

  render(){
    const { getFieldProps,getFieldDecorator }=this.props.form;

    const { projectModel, dispatch ,globalModel}=this.props;

    const {
      currentProject,
      projecttype,
      staffselectvisible,
      formType
    }=projectModel;

    const project=currentProject || {};

    const addHeaderConfig={
      leftTitle:'退出',
      centerTitle:'增加项目',
      rightTitle:'返回',
      rightVisible:true,
      onPop:()=>{this.handleCancelForm()},
      onQuit:()=>{DingTalkUtils.closeBrower()}
    }

    const editHeaderConfig={
      leftTitle:'退出',
      centerTitle:'编辑项目',
      rightTitle:'更多',
      rightVisible:true,
      onPop:()=>{this.handlePop()},
      onQuit:()=>{DingTalkUtils.closeBrower()}
    }

    return(
      <div className={styles.projectForm}>

        {formType==="ADD" && <HeaderHandler {...addHeaderConfig}/>}

        {formType==="EDIT" && <HeaderHandler {...editHeaderConfig} />}

        <div className={styles.projectformmain}>

          <InputItem  {...getFieldProps('name',{
            initialValue:project.name?project.name:null
          })} type={"right"} placeholder="请输入" clear
          >项目名称</InputItem>

          {getFieldDecorator('orgIdList',{
            initialValue:project.orgIdList?project.orgIdList:null
          })(<OrganizationSelector />)}

          {getFieldDecorator('assigneeIdList',{
            initialValue:project.assigneeIdList?project.assigneeIdList:null
          })(<ProjectStaffSelector globalModel={globalModel} label={"责任人"}/>)}

          {getFieldDecorator('supervisorIdList',{
            initialValue:project.supervisorIdList?project.supervisorIdList:null
          })(<ProjectStaffSelector globalModel={globalModel} label={"关注人"}/>)}

          <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

          <DatePicker {...getFieldProps('beginTime',{
            initialValue:project.beginTime?new Date(moment(project.beginTime,'YYYYMMDDHHmmssSSS')):new Date(),
          })} mode={"date"}>
            <Item arrow={"horizontal"} >请选择开始时间</Item>
          </DatePicker>

          <DatePicker {...getFieldProps('endTime',{
            initialValue:project.endTime?new Date(moment(project.endTime,'YYYYMMDDHHmmssSSS')):new Date(new Date().getTime()+24*60*60*1000),
          })} mode={"date"}>
            <Item arrow={"horizontal"} >请选择开始时间</Item>
          </DatePicker>

          <div style={{height:'10px',backgroundColor:'#F2F5F7'}}></div>

          <TextareaItem {...getFieldProps('description',{
            initialValue:project.description?project.description:null
          })} title={"项目描述"}
            placeholder={"请输入"} autoHeight></TextareaItem>

        </div>

        {
          formType==="ADD" &&<div className={styles.projectSubmitButton} onClick={(e)=>{
            this.handleSubmit(e)}}
          >确认创建</div>
        }

        {
          formType==="EDIT" && <div className={styles.editbutton}>
            <div onClick={(e)=>{
              this.handleSubmit(e)
            }}>保存</div>
            <div onClick={()=>{
              this.handleDelete(currentProject)
            }}>删除</div>
          </div>
        }

      </div>
    );
  }
}
export default createForm()(ProjectForm);
