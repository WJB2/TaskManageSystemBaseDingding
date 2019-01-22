import React, { PureComponent } from 'react';
import {connect} from 'dva';
import { Route, routerRedux } from 'dva/router';

import MainSiderBar from "./MainSiderBar";
import TaskForm from './../../tm/task/TaskForm';

import DingTalkPC from 'dingtalk-jsapi';

@connect(models => ({
  global: models.global,
  taskModel: models['tm/task']
}))
class MainLayout extends PureComponent{

  async componentWillMount(){

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

  forwardTo(path){
    const {global, dispatch} = this.props;

    dispatch(routerRedux.push(path));
  }

  addNewTaskHandler(){
    const {dispatch} = this.props;

    dispatch({
      type:'tm/task/updateState',
      payload : {
        formVisible:true,
        formType:'ADD',
        currentTask:null
      },
    });
  }


  render(){

    const {global,taskModel,routerData,dispatch} = this.props;

    const {componentsMap, currentActivePath} = global;

    const pathList = [];

    for(const path in componentsMap){
      pathList.push(path);
    }

    return (
      <div style={{width:'100%', height:'100%', display:'flex'}}>
        <div style={{ display: 'none' }}>
          {Object.keys(routerData)
            .filter(path => {
              return path !== '/' && path !== '/user/login';
            })
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
        </div>

        <MainSiderBar
          forwardTo={this.forwardTo.bind(this)}
          style={{
          width:75,
          height:'100%',
        }}
          addNewTaskHandler={
                        this.addNewTaskHandler.bind(this)
                      }
        />
        <div style={{
          flex:1,
          height:'100%',
          overflowY:'scroll',
        }}
        >
          {Object.keys(routerData)
            .filter(path => {
              return path !== '/' && path !== '/user/login';
            })
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
        </div>

        {taskModel.formVisible?<TaskForm />:null}

      </div>
    );
  }
}

export default MainLayout;
