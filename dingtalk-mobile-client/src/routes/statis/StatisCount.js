import React,{PureComponent} from 'react';
import styles from './StatisIndex.less';

class StatisCount extends PureComponent{

  render(){

    const {
      header,
      mode,
      taskList,

    }=this.props;

    console.log(taskList)

    return(
      <div className={styles.statTemTable}>

        <div className={styles.tableheader} >
          {
            header.map((item,index)=>(
              <div key={index} style={{paddingLeft:(mode!=="all"?'0.6rem':'0.3rem')}}>{item.name}</div>
            ))
          }
        </div>

        <div className={styles.tablebody}>
          {mode==="all"?taskList.map((item,index)=>(
            <div className={styles.tableItem1}  key={index}  style={(index+1)%2===0?{backgroundColor:'#FFF'}:{backgroundColor:'#F2F5F7'}}>
              <div className={styles.tablefirst}>{item.assignee?item.assignee.name:''}</div>
              <div className={styles.tablesecond}  style={{color:'#55ABE9'}}>{item.incomplete?item.incomplete:0}</div>
              <div className={styles.tablesecond}  style={{color:'green'}}>{item.incompleteUnderway?item.incompleteUnderway:0}</div>
              <div className={styles.tablesecond}  style={{color:'red'}}>{item.incompleteExpired?item.incompleteExpired:0}</div>
              <div className={styles.tablesecond} >{item.completed?item.completed:0}</div>
              <div className={styles.tablesecond} >{item.completedBefore?item.completedBefore:0}</div>
              <div className={styles.tablesecond} >{item.completedAfter?item.completedAfter:0}</div>
              <div className={styles.tablesecond} >{item.archived?item.archived:0}</div>
              <div className={styles.tablesecond} >{item.bonusPoints?item.bonusPoints:0}</div>
              <div className={styles.tablesecond} >{item.assigneeBonusPoints?item.assigneeBonusPoints:0}</div>
              <div className={styles.tablefirst}>{item.bonusPoints?item.bonusPoints:0}</div>
              <div className={styles.tablefirst}>{item.participatorBonusPoints?item.participatorBonusPoints:0}</div>
              <div className={styles.tablefirst}>{item.ownerBonusPoints?item.ownerBonusPoints:0}</div>
            </div>
          )):null}
          {mode==="underway"?taskList.map((item,index)=>(
              <div className={styles.tableItem2}  key={index}  style={(index+1)%2===0?{backgroundColor:'#FFF'}:{backgroundColor:'#F2F5F7'}}>
                <div className={styles.tablefirst}>{item.assignee?item.assignee.name:''}</div>
                <div className={styles.tablesecond}  style={{color:'#55ABE9'}}>{item.incomplete?item.incomplete:0}</div>
                <div className={styles.tablefirst}>{item.incompleteUnderway?item.incompleteUnderway:0}</div>
                <div className={styles.tablefirst} style={{color:'red'}}>{item.incompleteExpired?item.incompleteExpired:0}</div>
              </div>
            )):null}
          {mode==="completed"?taskList.map((item,index)=>(
            <div className={styles.tableItem3}  key={index} style={(index+1)%2===0?{backgroundColor:'#FFF'}:{backgroundColor:'#F2F5F7'}}>
              <div className={styles.tablefirst}>{item.assignee?item.assignee.name:''}</div>
              <div className={styles.tablesecond}  style={{color:'#55ABE9'}}>{item.completed?item.completed:0}</div>
              <div className={styles.tablefirst}>{item.completedBefore?item.completedBefore:0}</div>
              <div className={styles.tablefirst} style={{color:'red'}}>{item.completedAfter?item.completedAfter:0}</div>
            </div>
          )):null}
          {mode==="archived"?taskList.map((item,index)=>(
            <div className={styles.tableItem4}  key={index} style={(index+1)%2===0?{backgroundColor:'#FFF'}:{backgroundColor:'#F2F5F7'}}>
              <div className={styles.tablefirst}>{item.assignee?item.assignee.name:''}</div>
              <div className={styles.tablesecond}  style={{color:'#55ABE9'}}>{item.completed?item.completed:0}</div>
              <div className={styles.tablefirst}>{item.completedBefore?item.completedBefore:0}</div>
              <div className={styles.tablefirst} style={{color:'red'}}>{item.completedAfter?item.completedAfter:0}</div>
            </div>
          )):null}
          {mode==="project"?taskList.map((item,index)=>(
            <div className={styles.tableItem5}  key={index}  style={(index+1)%2===0?{backgroundColor:'#FFF'}:{backgroundColor:'#F2F5F7'}}>
              <div className={styles.tablefirst}>{item.assignee?item.assignee.name:''}</div>
              <div className={styles.tablesecond}  style={{color:'#55ABE9'}}>{item.incomplete?item.incomplete:0}</div>
              <div className={styles.tablefirst}>{item.incompleteExpired?item.incompleteExpired:0}</div>
              <div className={styles.tablefirst}>{item.completed?item.completed:0}</div>
              <div className={styles.tablefirst} style={{color:'red'}}>{item.completedBefore?item.completedBefore:0}</div>
              <div className={styles.tablefirst} style={{color:'red'}}>{item.completedAfter?item.completedAfter:0}</div>
              <div className={styles.tablefirst} style={{color:'red'}}>{item.completed?item.completed:0}</div>
            </div>
          )):null}
        </div>

      </div>
    )
  }
}

export default StatisCount;
