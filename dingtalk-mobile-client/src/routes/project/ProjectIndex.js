import React,{PureComponent} from 'react';

import { Pagination } from 'antd-mobile';

import ProjectForm from './ProjectForm';

import TabBarHandler from '../../components/main/TabBarHandler';
import ButtonHandler from '../../components/main/ButtonHandler';

import HeaderHandler from '../../components/main/HeaderHandler';

import styles from './ProjectIndex.less';

import ProjectMenu from './ProjectMenu';
import ProjectList from './ProjectList';

import ProjectDetail from './ProjectDetail';

import TabBarConfig from '../../config/TabBarConfig';

import DingTalkUtils from '../../utils/DingTalkUtils';

import {connect} from 'dva';

require("pinyin4js");

import _ from 'lodash';

// import {withRouter} from 'react-router-dom';

// @withRouter
@connect(models=>({
  projectModel:models['project/project'],
  globalModel:models['global'],
}))
class ProjectIndex extends React.Component{

  state={
    searchText:null,//输入框
  }

  componentWillMount(){//在客戶端和服務端都渲染一次 只调用一次

    const { dispatch }=this.props;

    dispatch({
      type:'project/project/queryProjectPageAsync',
      payload:{
        sortBy:'NAME_ASC'
      }
    });

    DingTalkUtils.disableBounce();

  }

  handleSkip(path){//主标签页跳转

    const { dispatch }=this.props;

    dispatch({
      type:'global/forwardDestroy',
      payload:{
        path:path
      }
    })
  }

  addActionHandler(){//增加新项目

    const {dispatch}=this.props;

    console.log("增加项目");

    dispatch({
      type:'project/project/updateState',
      payload:{
        formVisible:true,
        formType:'ADD',
        currentProject:null,
      }
    })

  }

  editActionHandler(payload){//进入详情页

    const {dispatch} = this.props;

    dispatch({
      type : 'project/project/editAction',
      payload,
    });
  }

  editActionProjectHandler(payload){//点击进入project编辑页

    const {dispatch}=this.props;
    dispatch({
      type:'project/project/editProjectAction',
      payload:{
        ...payload
      }
    })
  }

  searchProject(params){//加载项目

    const {dispatch}=this.props;

    dispatch({
      type:'project/project/queryProjectPageAsync',
      payload:{
        ...params
      }
    })

  }

  changeProject(values){
    const {dispatch}=this.props;
    if(values.length>0){
      dispatch({
        type:'project/project/updateState',
        payload:{
          searchListText:values,
        }
      })
    }else{
      dispatch({
        type:'project/project/updateState',
        payload:{
          searchListText:"不知所云"
        }
      })
    }

  }

  deleteAsyncProject(payload){

    const {dispatch}=this.props;

    dispatch({
      type:'project/project/deleteProjectByIdAsync',
      payload:{
        id:payload.id
      }
    })
  }

  filterOption(items,text){

    if(!text){
      return items;
    }

    console.log(items);
    console.log(text);

    text = text.toLowerCase();

    console.log(text);

    const freshList = items.filter(item=>{

      if(item.name.indexOf(text)>=0){
        return true;
      }

      for(let i=0; i<item._pinyin.length; i++){
        if(item._pinyin[i].indexOf(text)>=0){
          return true;
        }
      }

      return false;
    });

    console.log(freshList);

    return freshList;
  }

  handleSearchFocus(e){
     const {dispatch}=this.props;
     dispatch({
       type:'project/project/updateState',
       payload:{
         searchListText:'空空如也'
       }
     })
  }

  handleSearchCancel(){
    const {dispatch}=this.props;
    dispatch({
      type:'project/project/updateState',
      payload:{
        searchListText:null
      }
    })
  }

  handleBackMain(){
    const {dispatch}=this.props;
    dispatch({
      type:'project/project/updateState',
      payload:{
        detailVisible:false,
      }
    })
  }



  render(){
    const { projectModel, dispatch }=this.props;

    const { formVisible,currentLoadingTabBar,navBarTitle,centerNavBarVisible,
      detailVisible,currentLoadingTabs,buttonColor,projectList,searchListText
    }=projectModel;

    projectList.forEach(item=>{
      item._pinyin = [PinyinHelper.getShortPinyin(item.name), PinyinHelper.convertToPinyinString(item.name, '',PinyinFormat.WITHOUT_TONE )];
    });

    const filterProject=this.filterOption(projectList,searchListText);

    const listConfig={

      filterProject,
      onEdit:this.editActionHandler.bind(this),


    }

    const tabbarConfig={//标签栏设置
      value:'project',
      currentLoadingTabBar:currentLoadingTabBar,
      handleSkip:this.handleSkip.bind(this),
    }

    const buttonConfig={
      color:buttonColor,
      zIndex:10,
      onAdd:this.addActionHandler.bind(this)
    }

    const detailConfig={
      filterProject,
      currentLoadingTabs:currentLoadingTabs,
      editActionProjectHandler:this.editActionProjectHandler.bind(this),
      deleteAsyncProject:this.deleteAsyncProject.bind(this),
      onBack:this.handleBackMain.bind(this),
    }

    const menuConfig={

      onSearch:this.searchProject.bind(this),
      onChange:this.changeProject.bind(this),
      onFocus:this.handleSearchFocus.bind(this),
      onCancel:this.handleSearchCancel.bind(this)

    }

    const headerConfig={
      leftTitle:'退出',
      centerTitle:"项目",
      rightVisible:false,
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{console.log('a')}
    }

    return(
      <div className={styles.projectIndex}>

        <HeaderHandler {...headerConfig}/>

        {detailVisible && <ProjectDetail {...detailConfig}/>}

        <ProjectMenu {...menuConfig}/>

        <ProjectList {...listConfig} />

        <ButtonHandler {...buttonConfig}/>

        <TabBarHandler {...tabbarConfig}/>

      </div>
    );
  }
}
export default ProjectIndex;
