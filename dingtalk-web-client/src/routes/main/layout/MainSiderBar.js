import React, { Component } from 'react';
import { Route, routerRedux } from 'dva/router';

import '../../../common.less';
import {Icon, Avatar} from 'antd';

import styles from './MainSiderBar.less';

class MainSiderBar extends Component{

  render(){
    const {forwardTo, addNewTaskHandler} = this.props;

    return <div className={styles.siderBar}>

      <div className={styles.iconContainer}>
        <Avatar size="large" icon="user" />
      </div>

      <div className={styles.menuItem} onClick={
        ()=>{
          forwardTo('/home');
        }
      }>
        <Icon type={'home'} /><br/>
        <span>首页</span>
      </div>
      <div className={styles.menuItem} onClick={
        ()=>{
          forwardTo('/task');
        }
      }>
        <Icon type={'bars'} /><br/>
        <span>任务</span>
      </div>
      <div className={styles.menuItem} onClick={
        ()=>{
          forwardTo('/project');
        }
      }>
        <Icon type={'appstore'} /><br/>
        <span>项目</span>
      </div>
      <div className={styles.menuItem} onClick={
        ()=>{
          forwardTo('/statistics');
        }
      }>
        <Icon type={'area-chart'} /><br/>
        <span>统计</span>
      </div>
      <div className={styles.menuItem} onClick={
        ()=>{
          forwardTo('/bonus-points');
        }
      }>
        <Icon type={'star'} /><br/>
        <span>积分</span>
      </div>
      <div className={styles.menuItem} onClick={
        ()=>{
          forwardTo('/profile');
        }
      }>
        <Icon type={'user'} /><br/>
        <span>我的</span>
      </div>

      <div className={styles.menuItem + " " + styles.addTaskBtn} onClick={
        ()=>{
          addNewTaskHandler();
        }
      }>
        <Icon type={'plus-circle-o'} /><br/>
        <span>新任务</span>
      </div>
    </div>
  }
}

export  default  MainSiderBar;
