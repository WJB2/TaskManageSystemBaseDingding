import React, {Component} from 'react';
import { connect } from 'dva';
import {Tabs, Input, Button} from 'antd';

import TaskPane from './TaskPane';
import TaskList from './TaskList';

import styles from './TaskIndex.less';

const {TabPane} = Tabs;
const {Search} = Input;

@connect(models => ({
  globalModel: models.global,
  taskModel: models['tm/task'],
}))
class TaskIndex extends Component {

  componentWillMount(){
    const {dispatch} = this.props;

    dispatch({
      type:'tm/task/queryTaskPageAsync',
      payload:{
      },
    });
  }

  addActionHandler(){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/updateState',
      payload : {
        formVisible:true,
        formType:'ADD',
      },
    });
  }

  editActionHandler(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskAction',
      payload,
    });
  }

  searchTask(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/queryTaskPageAsync',
      payload : params,
    });
  }

  changeParams(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/mergeState',
      payload : {
        params,
      },
    });
  }

  changeQueryConditions(values){
    const {dispatch, taskModel} = this.props;

    const {params} = taskModel;

    if(values.indexOf('beginTime')<0){
      delete params.beginTimeStart;
      delete params.beginTimeEnd;
    }

    dispatch({
      type : 'tm/task/mergeState',
      payload : {
        queryConditions:values,
        params,
      },
    });
  }

  editGroupAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskGroup',
      payload,
    });
  }

  render(){

    const {globalModel, taskModel, dispatch} = this.props;

    const {queryConditions, data, params} = taskModel;

    const listConfig = {
      list: data.list,
      pagination : {...data.pagination,
        onChange: page => {
          dispatch({
            type: 'tm/task/queryTaskPageAsync',
            payload: {
              page,
            },
          });
        }},
      onEdit : this.editActionHandler.bind(this),
      onGroupEdit: this.editGroupAction.bind(this),
    }

    const paneConfigs = {
      queryConditions,
      queryType : params.queryType?params.queryType:'ASSIGNEE',
      onSearch: this.searchTask.bind(this),
      onParamsChange: this.changeParams.bind(this),
      onQueryConditionsChange: this.changeQueryConditions.bind(this),
      params: params||{}
    }

    return (
      <div className={styles.page}>
        <TaskPane {...paneConfigs} />
        <TaskList {...listConfig}/>
      </div>
    );
  }
}

export default TaskIndex;
