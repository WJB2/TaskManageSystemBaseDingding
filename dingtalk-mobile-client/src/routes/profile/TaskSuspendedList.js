import React,{PureComponent} from 'react';

import styles from './ProfileIndex.less';

import HeaderHandler from '../../components/main/HeaderHandler';

import {connect} from 'dva';

import DingTalkUtils from '../../utils/DingTalkUtils';

@connect(models=>({
  profileModel:models['profile/profile']
}))
class TaskSuspendedList extends PureComponent{

  componentWillMount(){
    const {dispatch}=this.props;
    document.addEventListener('backbutton',(e)=>{
      e.preventDefault();
      DingTalkUtils.closeBrower();
    })
  }

  render(){
    const { suspendData,onEdit,onBack }=this.props;

    console.log(suspendData)

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'挂起任务',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(
      <div className={styles.profileSuspend}>

        <HeaderHandler {...headerConfig}/>

        {
          suspendData.list.map((item,index)=>{
            return(
              <div key={index} className={styles.suspendList} onClick={()=>{
                onEdit(item)
              }}>
                <div>{item.title}</div>
                <div></div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default TaskSuspendedList;
