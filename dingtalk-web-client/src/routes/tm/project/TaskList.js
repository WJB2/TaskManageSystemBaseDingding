import React, {PureComponent} from 'react';

import {connect} from "dva/index";

import {List} from 'antd';

import TaskQueryPane from './../../../components/tm/task/TaskQueryPane';
import TaskItem from './../task/TaskItem';

@connect(models => ({
  globalModel: models.global,
  projectModel: models['tm/project'],
}))
class TaskList extends PureComponent {

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
      type : 'tm/project/queryTaskPageAsync',
      payload : params,
    });
  }

  changeParams(params){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/project/mergeState',
      payload : {
        taskParams:params,
      },
    });
  }

  changeQueryConditions(values){
    const {dispatch, projectModel} = this.props;

    const {taskParams} = projectModel;

    if(values.indexOf('beginTime')<0){
      delete taskParams.beginTimeStart;
      delete taskParams.beginTimeEnd;
    }

    dispatch({
      type : 'tm/project/mergeState',
      payload : {
        queryConditions:values,
        taskParams,
      },
    });
  }

  render(){

    const {projectModel} = this.props;

    const {taskData, queryConditions, taskParams} = projectModel;

    const paneConfigs = {
      queryConditions,
      onSearch: this.searchTask.bind(this),
      onParamsChange: this.changeParams.bind(this),
      onQueryConditionsChange: this.changeQueryConditions.bind(this),
      params: taskParams||{}
    }

    return (
      <div style={{backgroundColor: 'rgb(242, 245, 247)', height:'100%'}}>
        <TaskQueryPane {...paneConfigs} />

        <List
          dataSource={taskData.list}
          pagination={taskData.pagination}
          renderItem={
            (item)=>{
              return <TaskItem task={item} onEdit={()=>{
                this.editActionHandler(item);
              }} />
            }
          }
          style={{padding:16}}
        />
      </div>
    );
  }
}

export default TaskList;
