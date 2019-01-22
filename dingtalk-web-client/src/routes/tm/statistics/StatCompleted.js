import React, {Component} from 'react';

import {Table, DatePicker} from 'antd';


class StatCompleted extends Component {

  render(){

    const columns = [{
      title : '序号',
      key : 'rowNo',
      dataIndex : 'rowNo'
    }, {
      title : '责任人',
      key : 'assignee',
      dataIndex : 'assignee',
      render:(val)=>{
        return val?val.name:'';
      }
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

export default StatCompleted;
