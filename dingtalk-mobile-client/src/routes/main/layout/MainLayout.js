import React, { PureComponent } from 'react';
import {connect} from 'dva';
import { Route, routerRedux } from 'dva/router';

import TaskForm from '../../task/TaskForm';
import ProjectForm from '../../project/ProjectForm';

import styles from './MainLayout.less';
import {Button} from 'antd-mobile';

@connect(models => ({
  globalModel: models['global'],
  taskModel: models['task/task'],
  projectModel:models['project/project'],
}))
class MainLayout extends PureComponent{

  componentWillMount(){

    const {dispatch} = this.props;

    let searchStr = window.location.search;

    if (searchStr.startsWith("?")) {
      searchStr = searchStr.substr(1);
    }

    if (searchStr.endsWith("\\")) {
      searchStr = searchStr.substr(0, searchStr.length - 1);
    }

    const params = {};
    const strs = searchStr.split("&");
    strs.forEach((item) => {
      const parts = item.split("=");
      params[parts[0]] = parts[1];
    });


    dispatch({
      type: 'global/login',
      payload: {...params}
    });
  }

  render(){

    const {globalModel,routerData,taskModel,projectModel} = this.props;

    return (

      <div className={styles.mainlayout}>

        {!taskModel.formVisible && !projectModel.formVisible && Object.keys(routerData)
          .map(path => {
            return (
              <Route
                key={path}
                path={path}
                exact
                component={routerData[path].component}
              />
            );
          })}

        {taskModel.formVisible && <TaskForm />}

        {projectModel.formVisible && <ProjectForm />}

      </div>
    );
  }
}

export default MainLayout;
