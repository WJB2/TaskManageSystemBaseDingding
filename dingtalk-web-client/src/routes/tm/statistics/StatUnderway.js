import React, {Component} from 'react';

import {Table, DatePicker} from 'antd';


class StatUnderway extends Component {

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
    }];

    return (
      <div>
        <div style={{paddingBottom:16, textAlign:'center'}}>
          所属日期: <DatePicker.RangePicker  value={this.props.timeRange} onChange={this.props.onChange} />
        </div>
        <Table columns={columns} {...this.props}/>
      </div>
    );
  }
}

export default StatUnderway;
