import React,{PureComponent} from 'react';
import styles from './TaskIndex.less';
import moment from "moment/moment";
import componentUtils from "../../utils/ComponentUtils";
import taskTypeEnum from "../../enum/TaskTypeEnum";
import {Tag} from 'antd-mobile';
require("pinyin4js");
import _ from 'lodash';


const formatStatus = (task)=>{

  if(!task.unreachable&&!task.completed&&!task.archived){
    const days = new Date().getTime()-moment(task.endTime, "YYYYMMDDHHmmssSSS").valueOf()>0?
      parseInt((new Date().getTime()-moment(task.endTime, "YYYYMMDDHHmmssSSS").valueOf())/(24*60*60*1000) +1):0;

    return (<span style={{marginLeft:8, color:'red',fontSize:'0.3rem'}}>未完成{days>0?' · 已逾期'+days + '天':''}</span>);
  }

  if(task.archived){
    return (<span style={{marginLeft:8, color:'#2db7f5',fontSize:'0.3rem'}}>已归档</span>);
  }

  if(task.completed){
    return (<span style={{marginLeft:8, color:'#87d068',fontSize:'0.3rem'}}>已完成</span>);
  }

  if(task.unreachable){
    return (<span style={{marginLeft:8, color:'red',fontSize:'0.3rem'}}>无法完成</span>);
  }

}

class TaskList extends React.Component{

  render(){

    const {
      filterList,onEdit
    }=this.props;

    return(
      <div className={styles.taskList}>
          <div className={styles.tasklist}>
            {
              filterList.map((item,index)=>{
                return  <div className={styles.taskpanelist} key={index} onClick={()=>{
                  onEdit(item)
                }} >
                  <div className={styles.taskpanelineone}>
                    <div className={styles.taskpanelistdiv1}>{item.title}</div>
                    {!item.parentId && typeof item.parentId!="undefined" && item.parentId!=0 ?null:<div className={styles.taskpanesub}>子</div>}
                    <div className={styles.taskpanelisttag}><Tag small={true}>{taskTypeEnum.getDisplayText(item.taskType)}</Tag></div>
                  </div>

                  <div className={styles.taskpaneprogress}>
                    <div className={styles.taskpaneprogressstatus} style={{width:`${item.progressStatus}%`}}></div>
                  </div>

                  <div className={styles.taskpane}>
                    <div className={"iconfont"}>&#xe63d;</div>
                    <div className={styles.createName}>{item.assigneeList?item.assigneeList.map(item=>item.name).join('、'):''}</div>
                    <div className={styles.createtime}>{`${moment(item.endTime, 'YYYYMMDDHHmmssSSS').format('YYYY.MM.DD')}截止`}</div>
                    <div className={styles.createstatus}>{formatStatus(item)}</div>
                  </div>
                </div>
              })
            }
          </div>
      </div>
    );
  }
}

export default TaskList;
