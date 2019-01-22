import React, {Component} from 'react';

import {Table, DatePicker} from 'antd';


class StatProject extends Component {

  render(){

    const columns = [{
      title : '序号',
      key : 'rowNo',
      dataIndex : 'rowNo'
    }, {
      title : '项目名称',
      key : 'project',
      dataIndex : 'project',
      render:(val)=>{
        return val?val.name:'';
      }
    }, {
      title : '未完成总数',
      key : 'incomplete',
      dataIndex : 'incomplete'
    }, {
      title : '未逾期',
      key : 'incompleteUnderway',
      dataIndex : 'incompleteUnderway'
    }, {
      title : '已逾期',
      key : 'incompleteExpired',
      dataIndex : 'incompleteExpired'
    }, {
      title : '完成总数',
      key : 'completed',
      dataIndex : 'completed'
    }, {
      title : '提前完成',
      key : 'completedBefore',
      dataIndex : 'completedBefore'
    }, {
      title : '逾期完成',
      key : 'completedAfter',
      dataIndex : 'completedAfter'
    }, {
      title : '归档统计',
      key : 'archived',
      dataIndex : 'archived'
    }];

    return (
      <div>
        <div style={{paddingBottom:16, textAlign:'center'}}>
          所属日期: <DatePicker.RangePicker  value={this.props.timeRange}  onChange={this.props.onChange}/>
        </div>
        <Table columns={columns} {...this.props}/>
      </div>
    );
  }
}

export default StatProject;
