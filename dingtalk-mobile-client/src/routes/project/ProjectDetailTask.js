import React,{PureComponent} from 'react';

import ButtonComponent from '../../components/main/ButtonHandler';

import { ActionSheet,Button } from 'antd-mobile';

import DingTalkUtils from '../../utils/DingTalkUtils';

import styles from './ProjectIndex.less';

class ProjectDetailTask extends PureComponent{



  render(){

    const {navBarTitle,currentTask,onViewTask,currentProject,onBack}=this.props;

    const buttonConfig={
      color:'#5B88CB'
    }

    console.log(currentProject)


    console.log(currentTask)


    return(
      <div className={styles.projectDetailTask}>


        {/*<div className={styles.projectdetailmenu}>*/}
          {/*<div className={styles.projectdetailmenu1}>全部</div>*/}
          {/*<div className={styles.projectdetailmenu2}>创建时间(降序)</div>*/}
          {/*<div className={"iconfont"}>&#xe633;</div>*/}
          {/*<div className={"iconfont"}>&#xe626;</div>*/}
        {/*</div>*/}

        <div className={styles.projectTask}>
          {
            currentTask.map((item,index)=>{
              return(
                <div key={index} className={styles.taskList} onClick={()=>{this.props.onViewTask(item.id)}}>
                  <div className={styles.projectdetaillist1}>{item.title}</div>
                  <div className={styles.projectdetaillist2}>{item.label}</div>
                </div>
              )
            })
          }
        </div>

        <div onClick={()=>onBack()} className={styles.backButton}>返回</div>

      </div>
    )
  }
}

export default ProjectDetailTask;
