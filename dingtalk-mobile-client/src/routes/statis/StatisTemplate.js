import React,{PureComponent} from 'react';
import {DatePicker,WhiteSpace} from 'antd-mobile';
import StaffPane from '../../components/pane/StaffPane';
import StatisCount from './StatisCount';
import ComponentUtils from '../../utils/ComponentUtils';

import staffService from '../../services/system/StaffService';

import styles from './StatisIndex.less';

class StatisTemplate extends PureComponent{

  state={
    currentStartTime:null,
    currentEndTime:null,

  }

  componentDidMount(){

    const currentStartTime=this.timeStartRef.getAttribute('extra');

    const currentEndTime=this.timeEndRef.getAttribute('extra');

    this.setState({
      currentStartTime:currentStartTime,
      currentEndTime:currentEndTime
    })

  }

  render(){

    const { onSearch,taskList,beginTime,endTime,onDateChange,viewStaffPane,staffList,header,mode}=this.props;

    const { currentStartTime,currentEndTime }=this.state;

    console.log(staffList)


    return(
      <div className={styles.statTemIndex}>

        <WhiteSpace />

        <div className={styles.statTemTimePicker}>

          <div className={styles.statTemTime}>
            <DatePicker
              value={new Date()}
              mode={"date"}
              onChange={(values)=>{onSearch({beginTime:ComponentUtils.getDateFormat(values)});this.setState({currentStartTime:ComponentUtils.getDateFormat(values)})}}
            >
              <div ref={ref=>this.timeStartRef=ref}>
                {currentStartTime}
              </div>
            </DatePicker>
          </div>

          <div className={styles.statTemSwag}>~</div>

          <div className={styles.endTemTime}>
            <DatePicker
              value={new Date()}
              mode={"date"}
              onChange={(values)=>{onSearch({endTime:ComponentUtils.getDateFormat(values)});this.setState({currentEndTime:ComponentUtils.getDateFormat(values)})}} >
              <div ref={ref=>this.timeEndRef=ref}>
                {currentEndTime}
              </div>
            </DatePicker>
          </div>

        </div>

        <WhiteSpace />

        {/*<div className={styles.statTemAssignee} onClick={()=>{viewStaffPane()}}>*/}

          {/*<div className={"iconfont"}>&#xe609;</div>*/}
          {/*<div className={styles.statTemAssigneeName}>负责人</div>*/}
          {/*<div className={styles.statTemAssigneeRight}>*/}
            {/*{*/}
              {/*ComponentUtils.isEmpty(staffList)?<div className={styles.select}>请选择<span className={"iconfont"}>&#xe636;</span></div>:<div className={styles.staffList}>{staffList.map((item,index)=>(*/}
                {/*<div className={styles.staffListItem} key={index} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>*/}
                  {/*<div>{item.name.substring(item.name.length-2)}</div>*/}
                {/*</div>*/}
                {/*))*/}
              {/*}</div>*/}
            {/*}*/}
          {/*</div>*/}

        {/*</div>*/}

        <WhiteSpace />

        <StatisCount header={header} mode={mode} taskList={taskList}/>

      </div>
    )
  }
}

export default StatisTemplate;
