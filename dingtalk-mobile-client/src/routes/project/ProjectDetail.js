import React,{PureComponent} from 'react';

import { Card,WhiteSpace,WingBlank,Model,TabBar,Tabs } from 'antd-mobile';

import TabBarConfig from '../../config/TabBarConfig';

import ProjectDetailTask from '../../routes/project/ProjectDetailTask';
import ProjectDetailLog from '../../routes/project/ProjectDetailLog';
import ProjectDetailAccess from '../../routes/project/ProjectDetailAccess';


import styles from './ProjectIndex.less';
import fileService from './../../services/system/FileService';
import tabsConfig from '../../config/TabsConfig';

import DingTalkUtils from '../../utils/DingTalkUtils';
import HeaderHandler from '../../components/main/HeaderHandler';

const TabPane = Tabs.TabPane;

import { connect } from 'dva';
import {ActionSheet} from "antd-mobile/lib/index";

@connect(models=>({
  globalModel:models.global,
  projectModel:models['project/project'],
}))
class ProjectDetail extends PureComponent{

  componentDidMount(){
    const {dispatch,projectModel}=this.props;


  }

  handleTaskPop(){

    const { projectModel}=this.props;

    const {currentProject}=projectModel;

    console.log(currentProject);

    const BUTTONS=['项目详情','删除项目','取消'];

    ActionSheet.showActionSheetWithOptions({
      options:BUTTONS,
      cancelButtonIndex:BUTTONS.length-1,
      title:'请选择操作',
    },(buttonIndex)=>{
      if(BUTTONS[buttonIndex]==="项目详情"){
        this.props.editActionProjectHandler(currentProject)
      }else if(BUTTONS[buttonIndex]==="删除项目"){
        this.props.deleteAsyncProject(currentProject)
      }
    })
  }

  state={
    taskVisible:true,
    logVisible:false,
    accessVisible:false,
    progressVisible:false,
    dataSource:[
      'taskVisible','logVisible','accessVisible','progressVisible'
    ],
    page:0,
  }

  handleClickTabBar(path){

    const { dispatch }=this.props;

    dispatch({
      type:'global/forwardDestroy',
      payload:{
        path:path,
      }
    })
  }

  handleChangeTabs(e){
    const restArray=this.state.dataSource.filter((item,index)=>{
      return item!==e;
    })
    this.setState({
      [e]:true,
    })
    restArray.map((item,index)=>{
       this.setState({
         [item]:false,
       })
    })
  }

  handleViewTask(id){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/editTaskAction',
      payload:{
        id:id,
      }
    })
  }

  async handleAgent(filesID){
    const {dispatch}=this.props;
    const fileList=await fileService.downloadFile({
      fileId:filesID,
    })
    console.log(fileList)
  }



  render(){
    const {taskVisible,logVisible,accessVisible,progressVisible}=this.state;

    const { projectModel,deleteAsyncProject,onBack }=this.props;

    const { currentLoadingTabs,currentProject,currentTask}=projectModel;

    const tabs = [
      { title: '任务', sub: 0},
      { title: '日志', sub: 1},
      { title: '附件', sub: 2},
    ];

    const taskHeaderConfig={
      leftTitle:'退出',
      centerTitle:currentProject.name,
      rightVisible:true,
      rightTitle:'更多',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop: this.handleTaskPop.bind(this),
    }

    return(
      <div className={styles.projectDetail}>

        {this.state.page===0 && <HeaderHandler {...taskHeaderConfig}/>}

        <Tabs
          tabs={tabs}
          tabBarBackgroundColor={"#3A4479"}
          tabBarActiveTextColor={"#FFFFFF"}
          tabBarInactiveTextColor={"grey"}
          page={this.state.page}
          onChange={(e)=>this.setState({page:e.sub})}
        >


          <ProjectDetailTask
            onViewTask={(id)=>{this.handleViewTask(id)}}
            currentTask={currentTask}
            deleteAsyncProject={(payload)=>{deleteAsyncProject(payload)}}
            currentProject={currentProject}
            editActionProjectHandler={(values)=>{editActionProjectHandler(values)}}
            onBack={()=>{onBack()}}
          />

          <ProjectDetailLog  currentProject={currentProject} onBack={()=>{onBack()}}/>

          <ProjectDetailAccess  currentProject={currentProject} onBack={()=>{onBack()}} />

        </Tabs>


      </div>
    );
  }
}
export default ProjectDetail;
