import React, {Component} from 'react';
import moment from 'moment';
import {Tabs} from 'antd';

import StatAll from './StatAll';
import StatUnderway from './StatUnderway';
import StatCompleted from "./StatCompleted";
import StatArchived from "./StatArchived";
import StatProject from "./StatProject";
import {connect} from "dva/index";

const TabPane = Tabs.TabPane;

@connect(models => ({
  globalModel: models.global,
  statisticsModel: models['tm/statistics'],
}))
class StatisticsIndex extends Component {

  componentWillMount(){

    const {dispatch} = this.props;

    dispatch({
      type : 'tm/statistics/reportByAssignee',
      payload : {
        tabKey: 'all'
      }
    });
  }

  onViewTaskList(params){
    const {dispatch, globalModel} = this.props;

    dispatch({
      type : 'tm/statistics/viewTaskList',
      payload: params
    });
  }

  onDateRangeChange(params){
    const {dispatch, globalModel} = this.props;

    dispatch({
      type : 'tm/statistics/reportByAssignee',
      payload: {
        beginTime: params[0].format('YYYY-MM-DD HH:mm:ss.SSS'),
        endTime: params[1].format('YYYY-MM-DD HH:mm:ss.SSS'),
      }
    });
  }

  render(){

    const {globalModel, statisticsModel, dispatch} = this.props;

    const {tabKey, data, params} = statisticsModel;

    const beginDate = moment(params.beginTime, 'YYYY-MM-DD HH:mm:ss.SSS');
    const endDate = moment(params.endTime, 'YYYY-MM-DD HH:mm:ss.SSS');

    const pagination = {
      ...data.pagination,
        onChange: page => {
          if(tabKey!=='project'){
            dispatch({
              type : 'tm/statistics/reportByAssignee',
              payload : {
                tabKey,
                page,
              }
            });
          }else{
            dispatch({
              type : 'tm/statistics/reportByProject',
              payload : {
                tabKey,
                page,
              }
            });
          }
        },
    }

    return (
      <Tabs activeKey={tabKey} onChange={(activeKey)=>{
        if(activeKey!=='project'){
          dispatch({
            type : 'tm/statistics/reportByAssignee',
            payload : {
              tabKey: activeKey
            }
          });
        }else{
          dispatch({
            type : 'tm/statistics/reportByProject',
            payload : {
              tabKey: activeKey
            }
          });
        }
      }}>
        <TabPane tab={"全员统计"} key="all" style={{padding:16}}>
          <StatAll viewTaskList={this.onViewTaskList.bind(this)} onChange={this.onDateRangeChange.bind(this)} dataSource={data.list} pagination={pagination}
                   timeRange={[beginDate, endDate]} />
        </TabPane>
        <TabPane tab={"进展统计"} key="progress"  style={{padding:16}}>
          <StatUnderway viewTaskList={this.onViewTaskList.bind(this)} onChange={this.onDateRangeChange.bind(this)} dataSource={data.list} pagination={pagination}
                        timeRange={[beginDate, endDate]} />
        </TabPane>
        <TabPane tab={"完成统计"} key="completed"  style={{padding:16}}>
          <StatCompleted viewTaskList={this.onViewTaskList.bind(this)} onChange={this.onDateRangeChange.bind(this)} dataSource={data.list} pagination={pagination}
                         timeRange={[beginDate, endDate]} />
        </TabPane>
        <TabPane tab={"归档统计"} key="archived"  style={{padding:16}}>
          <StatArchived viewTaskList={this.onViewTaskList.bind(this)} onChange={this.onDateRangeChange.bind(this)} dataSource={data.list} pagination={pagination}
                        timeRange={[beginDate, endDate]} />
        </TabPane>
        <TabPane tab={"项目统计"} key="project"  style={{padding:16}}>
          <StatProject viewTaskList={this.onViewTaskList.bind(this)} onChange={this.onDateRangeChange.bind(this)} dataSource={data.list} pagination={pagination}
                       timeRange={[beginDate, endDate]} />
        </TabPane>
      </Tabs>
    );
  }
}

export default StatisticsIndex;
