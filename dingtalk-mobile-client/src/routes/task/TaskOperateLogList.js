import React,{PureComponent} from 'react';

import moment from 'moment';
import ComponentUtils from '../../utils/ComponentUtils';

import styles from './TaskIndex.less';

class TaskOperateLogList extends PureComponent{

  formatTime(time){
    const opTime = moment(time, 'YYYYMMDDHHmmssSSS');
    const opMils = opTime.valueOf();
    const nowMils = new Date().getTime();

    if((nowMils-opMils)/1000<60){
      return parseInt((nowMils-opMils)/1000) + "秒前"
    }

    if((nowMils-opMils)/(60*1000)<60){
      return parseInt((nowMils-opMils)/(60*1000)) + "分前"
    }

    if((nowMils-opMils)/(60*60*1000)<24){
      return parseInt((nowMils-opMils)/(60*60*1000)) + "小时前"
    }

    if((nowMils-opMils)/(24*60*60*1000)<3){
      return parseInt((nowMils-opMils)/(24*60*60*1000)) + "天前"
    }

    return opTime.format("YYYY-MM-DD HH:mm:ss");
  }

  render(){

    const {taskOperateLogList}=this.props;


    return(
      <div className={styles.taskoperatelog}>
        {
          taskOperateLogList.map((log,index)=>(
            <div key={index} className={styles.taskoperateitem}>
              <div className={styles.circlename} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                {log.operateBy.name.substring(log.operateBy.name.length-2)}
                </div>
              <div className={styles.name}>{log.operateBy.name}</div>
              <div className={styles.description}>{log.description}</div>
              <div className={styles.time}>{this.formatTime(log.operateTime)}</div>
            </div>
          ))
        }
        </div>
    )
  }
}

export default TaskOperateLogList;
