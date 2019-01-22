import React,{PureComponent} from 'react';

import styles from './ProfileIndex.less';

import DingTalkUtils from "../../utils/DingTalkUtils";

import {connect} from 'dva';

import HeaderHandler from '../../components/main/HeaderHandler';

@connect(models=>({
  profileModel:models['profile/profile']
}))
class TaskArchivedList extends PureComponent{

  componentWillMount(){
    const {dispatch}=this.props;
    document.addEventListener('backbutton',(e)=>{
      e.preventDefault();
      DingTalkUtils.closeBrower()
    })
  }

  render(){

    const {archivedData,onEdit,onBack}=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'归档任务',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(
      <div className={styles.profileArchived}>

        <HeaderHandler {...headerConfig}/>

        {
          archivedData.list.map((item,index)=>{
            return (
              <div  key={index} className={styles.archivedList} onClick={()=>{onEdit(item)}}>
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

export default TaskArchivedList;
