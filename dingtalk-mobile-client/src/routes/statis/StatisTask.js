import React,{PureComponent} from 'react';
import { Tabs,WhiteSpace } from 'antd-mobile';
import StatisTemplate from './StatisTemplate';

class StatisTask extends React.Component{

  render(){

    const {

      beginTime,
      endTime,
      viewStaffPane,
      staffList,
      taskList,
      allHeader,
      underWayHeader,
      completedHeader,
      archivedHeader,
      onSearch,

    }=this.props;

    const tabsConfig={
      tabs:[{title:'进展统计'},{title:'完成统计'},{title:'归档统计'}],
      swipeable:false,
    }

    const templateConfig={

      beginTime,
      endTime,
      viewStaffPane,
      staffList,
      taskList,
      onSearch

    }

    return(
      <div>

        <WhiteSpace />

        <Tabs {...tabsConfig}>

          {/*<StatisTemplate {...templateConfig} header={allHeader} mode={"all"}/>*/}

          <StatisTemplate {...templateConfig} header={underWayHeader} mode={"underway"} />

          <StatisTemplate {...templateConfig} header={completedHeader} mode={"completed"} />

          <StatisTemplate {...templateConfig} header={archivedHeader} mode={"archived"} />

        </Tabs>

      </div>
    )
  }
}

export default StatisTask;
