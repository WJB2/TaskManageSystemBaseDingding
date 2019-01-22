import React,{PureComponent} from 'react';

import { Tag,PullToRefresh,ActionSheet } from 'antd-mobile';

import ComponentUtils from '../../utils/ComponentUtils';
import DingTalkUtils from '../../utils/DingTalkUtils';

import TabBarHandler from '../../components/main/TabBarHandler';
import ButtonHandler from '../../components/main/ButtonHandler';

import CircularSchedule from '../../components/main/CircularSchedule';
import HeaderHandler from '../../components/main/HeaderHandler';

import styles from './HomeIndex.less';

import {connect} from 'dva';
import TaskTypeEnum from "../../enum/TaskTypeEnum";

class AuditItem extends PureComponent{

  render(){

    const {auditTaskList,viewTaskInfo}=this.props;

    console.log(auditTaskList)

    return(
      <div className={styles.auditItem}>
        <div className={styles.auditHeader}>待审核的</div>
        <div className={styles.auditList}>
          {
            ComponentUtils.isEmpty(auditTaskList)?<div className={"iconfont"} style={{textAlign:'center',fontSize:"2rem",verticalAlign:'center'}}>&#xe660;</div>:auditTaskList.map((item,index)=>(
              <div key={index} className={styles.logAItem}  onClick={()=>{
                if(viewTaskInfo){
                  viewTaskInfo(item.id);
                }
              }}>
                <div className={styles.logAItemIconWrapper}>
                  <div className={styles.logAItemIcon} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>{"aaa"}</div>
                </div>
                <div className={styles.logATaskInfo}>
                  <div className={styles.logTaskATitle}>{item.title}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

class DynamicCard extends PureComponent{

  render(){

    const {taskList, onRefresh, viewTaskInfo}=this.props;

    return(
      <div className={styles.homedynamic}>

        <div className={styles.header}>
          <div>动态</div>
          <div onClick={()=>{
            onRefresh();
          }} className="iconfont" >&#xe71e;</div>
        </div>

        <div className={styles.content}>
          {!ComponentUtils.isEmpty(taskList)?taskList.map((item,index)=>{
            return (
              <div key={index} className={styles.logItem}  onClick={()=>{
                if(viewTaskInfo){
                  viewTaskInfo(item.taskId);
                }
              }}>
                <div className={styles.logItemIconWrapper}>
                  <div className={styles.logItemIcon} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>{item.operateBy.name.substring(item.operateBy.name.length-2)}</div>
                </div>
                <div className={styles.logTaskInfo}>
                  <div>{item.operateBy.name+" "+item.description}<span>{"("+item.logAmount+"条新动态)"}</span></div>
                  <div className={styles.logTaskTitle}>{item&&item.task&&item.task.title}</div>
                  <div className={styles.logTaskTag}>{item.task?TaskTypeEnum.getDisplayText(item.task.taskType):''}</div>
                </div>
              </div>
            )
          }):<div className={"iconfont"} style={{fontSize:'5rem',color:'#3A4479',textAlign:'center'}} >&#xe660;</div>}

        </div>

      </div>
    )
  }
}

class TaskItem extends PureComponent{

  render(){

    const {ownerTasks,assigneeTasks,supervisorTasks, participatorTasks}=this.props;

    let ownerTasksSum=ownerTasks.unbegin+ownerTasks.underway+ownerTasks.expired;
    let assigneeTasksSum=assigneeTasks.unbegin+assigneeTasks.underway+assigneeTasks.expired;
    let supervisorTasksSum=supervisorTasks.unbegin+supervisorTasks.underway+supervisorTasks.expired;
    let participatorTasksSum=participatorTasks.unbegin+participatorTasks.underway+participatorTasks.expired;

    const progressConfig={
      id:'start',
      currentSums:ownerTasksSum,
      sideLength:55,
      borderWidth:0.9,
      dataArray:[
        {name:'未开始',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.unbegin : 1/3,a:'1'},
        {name:'进行中',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.underway : 1/3,a:'1'},
        {name:'已过期',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.expired : 1/3,a:'1'},
      ],
      colorArray:['#C9C9C9', '#FFC901', '#FF8488']
    }

    const participatorConfig={
      id:'participator',
      currentSums:participatorTasksSum,
      sideLength:55,
      borderWidth:0.9,
      dataArray:[
        {name:'未开始',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.unbegin : 1/3,a:'1'},
        {name:'进行中',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.underway : 1/3,a:'1'},
        {name:'已过期',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.expired : 1/3,a:'1'},
      ],
      colorArray:['#C9C9C9', '#FFC901', '#FF8488']
    }

    const focusConfig={
      id:'focus',
      currentSums:assigneeTasksSum,
      sideLength:55,
      borderWidth:0.9,
      dataArray:[
        {name:'未开始',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.unbegin : 1/3,a:'1'},
        {name:'进行中',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.underway : 1/3,a:'1'},
        {name:'已过期',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.expired : 1/3,a:'1'},
      ],
      colorArray:['#C9C9C9', '#FFC901', '#FF8488']
    }

    const responseConfig={
      id:'response',
      currentSums:supervisorTasksSum,
      sideLength:55,
      borderWidth:0.9,
      dataArray:[
        {name:'未开始',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.unbegin : 1/3,a:'1'},
        {name:'进行中',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.underway : 1/3,a:'1'},
        {name:'已过期',percent:(participatorTasksSum.unbegin||participatorTasksSum.underway||participatorTasksSum.expired) ? participatorTasksSum.expired : 1/3,a:'1'},
      ],
      colorArray:['#C9C9C9', '#FFC901', '#FF8488']
    }

    return(
      <div className={styles.homestatis}>

        <div className={styles.homepage}>
          <div>我的任务</div>
          <div style={{width:'0.1rem',height:'0.1rem',borderRadius:'50%',backgroundColor:'#C9C9C9'}}></div>
          <div>未开始</div>
          <div style={{width:'0.1rem',height:'0.1rem',borderRadius:'50%',backgroundColor:'#FFC901'}}></div>
          <div>进行中</div>
          <div style={{width:'0.1rem',height:'0.1rem',borderRadius:'50%',backgroundColor:'#FF8488'}}></div>
          <div>已过期</div>
        </div>

        <div className={styles.hometaskcircle}>
          <div className={styles.started}>
              <CircularSchedule {...progressConfig} />
              <div>我发起的</div>
          </div>

          <div className={styles.participator}>
            <CircularSchedule {...participatorConfig} />
            <div>我负责的</div>
          </div>

          <div className={styles.focus}>
            <CircularSchedule {...focusConfig} />
            <div>我参与的</div>
          </div>

          <div className={styles.response}>
            <CircularSchedule {...responseConfig}/>
            <div>我关注的</div>
          </div>
        </div>
      </div>
    )
  }
}

@connect(models => ({
  globalModel: models['global'],
  homeModel:models['home/home'],
  taskModel:models['task/task']
}))
class HomeIndex extends PureComponent{

  componentWillMount(){//页面初始化加载数据
    const {dispatch, globalModel} = this.props;

    dispatch({
      type : 'home/home/initData',
      payload:{
        staffId : globalModel.position.staffId
      }
    });

    DingTalkUtils.disableBounce();

  }

  handleTabBarChange(path){//点击标签栏进行路由跳转

    const { dispatch }=this.props;

    dispatch({
      type:'global/forwardDestroy',
      payload:{
        path:path
      }
    })
  }

  handleRefresh(){//点击图标进行刷新
    const {dispatch} = this.props;

    dispatch({
      type : 'home/home/refreshOperateLog',
      payload:{}
    });
  }

  addNewTaskHandler(){//点击加号图标出现菜单

    const {dispatch}=this.props;

    dispatch({
      type:'task/task/updateState',
      payload:{
        formVisible:true,
        formType:'ADD',
        currentTask:null
      }
    })
  }

  editActionHandler(payload){
    const {dispatch} = this.props;

    console.log(payload)

    console.log("我被点击了")

    dispatch({
      type : 'task/task/editTaskAction',
      payload:{
        id:payload
      }
    });
  }

  render(){

    const {globalModel, homeModel,dispatch} = this.props;

    const {
      ownerTasks,
      assigneeTasks,
      supervisorTasks,
      participatorTasks,
      currentLoadingTabBar,
      taskList,
      auditTaskList
    } = homeModel;

    console.log(auditTaskList)

    const headerConfig={
      leftTitle:"退出",
      centerTitle:"首页",
      rightVisible:false,
      onQuit:()=>{DingTalkUtils.closeBrower()}
    }

    const itemConfig={
      ownerTasks:ownerTasks,
      assigneeTasks:assigneeTasks,
      supervisorTasks:supervisorTasks,
      participatorTasks:participatorTasks,
    }

    return(
      <div className={styles.homeindex}>

        <HeaderHandler {...headerConfig}/>

        <div className={styles.homecontainer}>

            <TaskItem {...itemConfig} />

            <AuditItem auditTaskList={auditTaskList} viewTaskInfo={this.editActionHandler.bind(this)} />

            <DynamicCard onRefresh={this.handleRefresh.bind(this)}
                         viewTaskInfo={(taskId)=>{
                              dispatch({
                                  type : 'task/task/editTaskAction',
                                  payload:{
                                      id:taskId
                                  },
                                });
                          }} taskList={taskList} />

        </div>

        <div style={{height:'1.2rem'}}></div>

        <TabBarHandler value={'home'} handleSkip={this.handleTabBarChange.bind(this)} currentLoadingTabBar={currentLoadingTabBar} />

        <ButtonHandler color={'#5B88CB'} onAdd={this.addNewTaskHandler.bind(this)} />

      </div>
    );
  }
}
export default HomeIndex;
