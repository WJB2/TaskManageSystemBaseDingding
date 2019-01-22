import React,{PureComponent} from 'react'

import { WhiteSpace,ActionSheet,TabBar,Tabs } from 'antd-mobile';

import TabBarConfig from '../../config/TabBarConfig';
import ComponentUtils from '../../utils/ComponentUtils';
import StaffPane from '../../components/pane/StaffPane'

import DingTalkUtils from '../../utils/DingTalkUtils';

import TabBarHandler from '../../components/main/TabBarHandler';
import HeaderHandler from '../../components/main/HeaderHandler';
import StatisTask from './StatisTask';
import StatisProject from './StatisProject';

import styles from './StatisIndex.less';

import {connect} from 'dva';
import staffService from "../../services/system/StaffService";

@connect(models=>({
  statisModel:models['statis/statis'],
  globalModel:models['global'],
}))
class StatisIndex extends PureComponent{

  componentWillMount(){//页面未初始化
    console.log('页面初始化')

    const {dispatch}=this.props;

    dispatch({
      type:'statis/statis/reportByAssignee',
      payload:{
        tabKey:'all'
      }
    })

  }

  handleSkip(path){//点击标签栏进行页面跳转

    const { dispatch }=this.props;
    dispatch({
      type:'global/forwardDestroy',
      payload:{
        path:path
      }
    })
  }

  viewStaffPane(){//点击选择负责人出现负责人面板
    const {dispatch}=this.props;

    dispatch({
      type:'statis/statis/updateState',
      payload:{
        staffVisible:true,
        tabBarVisible:false,
      }
    })
  }

  handleCancel(){//点击面板返回负责人面板消失

    const {dispatch}=this.props;

    dispatch({
      type:'statis/statis/updateState',
      payload:{
        staffVisible:false,
        tabBarVisible:true,
      }
    })
  }

  async handleSubmit(values){//点击确认提交

    const {dispatch}=this.props;

    if(values && values.length>0 ){

      const staffList=await staffService.findStaffList({
        id:values
      })

      this.searchTask({assigneeIdList:values})

      dispatch({
        type:'statis/statis/updateState',
        payload:{
          staffList:staffList,
          staffVisible:false,
          tabBarVisible:true,
        }
      })
    }
  }

  handleChangeTabs(values){//切换tabs
    const {dispatch}=this.props;
    if(values.title==="项目统计"){
      dispatch({
        type:'statis/statis/reportByProject',
        payload:{
          tabKey:'project',
        }
      })
    }else{
      dispatch({
        type:'statis/statis/reportByAssignee',
        payload:{
          tabKey:'all'
        }
      })
    }
  }

  searchTask(params){
    console.log('触发了我');
    console.log(params);
    const {dispatch} = this.props;

    dispatch({
      type : 'statis/statis/reportByAssignee',
      payload : {...params},
    });
  }


  render(){

    const { statisModel }=this.props;

    const {
      currentLoadingTabBar,params,staffVisible,tabBarVisible,staffList,
      allHeader,underWayHeader,completedHeader,archivedHeader,projectHeader,
      taskList,projectList
    }=statisModel;

    const {beginTime,endTime}=params;

    const headerConfig={//头部设置
      leftTitle:'退出',
      centerTitle:"统计",
      rightVisible:false,
      onHandleBack:()=>{DingTalkUtils.closeBrower()}
    }

    const tabbarConfig={//标签栏设置
      value:'statis',
      currentLoadingTabBar:currentLoadingTabBar,
      handleSkip:this.handleSkip.bind(this),
    }

    const tabsConfig={//tabs设置
      tabs:[{title:'任务统计'},{title:'项目统计'}],
      tabBarBackgroundColor:'#3B4477',
      tabBarInactiveTextColor:'#fff',
      tabBarActiveTextColor:'#fff',
      swipeable:false,
      onChange:this.handleChangeTabs.bind(this)
    }

    return(
      <div className={styles.statisindex}>

        <HeaderHandler {...headerConfig}/>

        {staffVisible &&<StaffPane
          onBack={this.handleCancel.bind(this)}
          onHandleSubmit={this.handleSubmit.bind(this)}
        />}

        <Tabs {...tabsConfig} >

          <StatisTask
            onSearch={this.searchTask.bind(this)}
            viewStaffPane={this.viewStaffPane.bind(this)}
            beginTime={beginTime}
            endTime={endTime}
            staffList={staffList}
            taskList={taskList}
            allHeader={allHeader}
            underWayHeader={underWayHeader}
            completedHeader={completedHeader}
            archivedHeader={archivedHeader}
        />


          <StatisProject
            onSearch={this.searchTask.bind(this)}
            viewStaffPane={this.viewStaffPane.bind(this)}
            beginTime={beginTime}
            endTime={endTime}
            taskList={taskList}
            projectHeader={projectHeader}
            staffList={staffList}
          />

        </Tabs>

        {tabBarVisible && <TabBarHandler {...tabbarConfig}/>}

      </div>
    );
  }
}
export default StatisIndex;
