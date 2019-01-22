import React,{PureComponent} from 'react';
import StatisTemplate from './StatisTemplate';
import {Tabs,WhiteSpace} from 'antd-mobile';

class StatisProject extends PureComponent{

  render(){
    const {
      onSearch,
      beginTime,
      endTime,
      viewStaffPane,
      staffList,
      projectHeader,
      taskList
    }=this.props;

    const tabsConfig={
      tabs:[{title:'项目统计'}],
      swipeable:false,
    }

    const templateConfig={
      onSearch,
      beginTime,
      endTime,
      viewStaffPane,
      staffList,
      projectHeader,
      taskList
    }

    return(
      <div>

        <WhiteSpace />

        <Tabs {...tabsConfig} >

          <StatisTemplate {...templateConfig} header={projectHeader} mode={"project"} />

        </Tabs>
      </div>
    )
  }
}

export default StatisProject;
