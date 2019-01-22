import React, {Component} from 'react';
import { connect } from 'dva';
import {Tabs, Input, Button} from 'antd';

import ProjectPane from './ProjectPane';
import ProjectForm from './ProjectForm';

import styles from './ProjectIndex.less';
import ProjectList from "./ProjectList";

const {TabPane} = Tabs;
const {Search} = Input;

@connect(models => ({
  globalModel: models.global,
  projectModel: models['tm/project'],
}))
class ProjectIndex extends Component {

  componentWillMount(){
    const {dispatch} = this.props;

    dispatch({
      type:'tm/project/queryProjectPageAsync',
      payload:{

      },
    });
  }

  addActionHandler(){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/updateState',
      payload : {
        formVisible:true,
        formType:'ADD',
        currentProject:null,
      },
    });
  }

  editActionHandler(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/editProjectAction',
      payload,
    });
  }

  formSubmitActionHandler(params){
    const {dispatch} = this.props;

    if(params.id){
      dispatch({
        type : 'tm/project/editProjectAsync',
        payload : params,
      });
    }else{
      dispatch({
        type : 'tm/project/addProjectAsync',
        payload : params,
      });
    }
  }

  formCancelActionHandler(){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/updateState',
      payload : {
        formVisible:false,
        formType: null,
      },
    });
  }

  viewProjectTaskListActionHandler(project){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/viewTaskList',
      payload : project,
    });
  }

  serachProject(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/queryProjectPageAsync',
      payload : params,
    });
  }

  changeParams(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/mergeState',
      payload : {
        params,
      },
    });
  }



  render(){
    const {globalModel, projectModel, dispatch} = this.props;

    const {formVisible, formType, data, currentProject} = projectModel;

    const paneConfig = {
      onAdd: this.addActionHandler.bind(this),
      onParamsChange:this.changeParams.bind(this),
      onSearch:this.serachProject.bind(this),
    }

    const formConfig = {
      formType,
      currentProject,
      onSubmit:this.formSubmitActionHandler.bind(this),
      onCancel:this.formCancelActionHandler.bind(this),
    }

    const listConfig = {
      list: data.list,
      pagination : {...data.pagination,
        onChange: page => {
          dispatch({
            type: 'tm/project/queryProjectPageAsync',
            payload: {
              page,
            },
          });
        }},
      onEdit : this.editActionHandler.bind(this),
      onViewProjectTaskList:this.viewProjectTaskListActionHandler.bind(this),
    }

    return (
      <div className={styles.page}>
        <ProjectPane {...paneConfig} />
        <ProjectList {...listConfig} />
        {formVisible?<ProjectForm {...formConfig} />:null}
      </div>
    );
  }
}

export default ProjectIndex;
