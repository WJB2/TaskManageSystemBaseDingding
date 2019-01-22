import React, {Component} from 'react';

import {Table, DatePicker} from 'antd';


class StatAll extends Component {

  render(){

    const {viewTaskList} = this.props;

    const columns = [{
      title : '序号',
      key : 'rowNo',
      dataIndex : 'rowNo'
    }, {
      title : '责任人/参与人',
      key : 'assignee',
      dataIndex : 'assignee',
      render:(val)=>{
        return val?val.name:'';
      }
    }, {
      title : '未完成总数',
      key : 'incomplete',
      dataIndex : 'incomplete',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'INCOMPLETE',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '未逾期',
      key : 'incompleteUnderway',
      dataIndex : 'incompleteUnderway',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'ONGOING',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '已逾期',
      key : 'incompleteExpired',
      dataIndex : 'incompleteExpired',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'EXPIRED',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '完成总数',
      key : 'completed',
      dataIndex : 'completed',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'COMPLETED',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '提前完成',
      key : 'completedBefore',
      dataIndex : 'completedBefore',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'COMPLETED_BEFORE',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '逾期完成',
      key : 'completedAfter',
      dataIndex : 'completedAfter',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'COMPLETED_AFTER',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '归档统计',
      key : 'archived',
      dataIndex : 'archived',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'ARCHIVED',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '所得积分',
      key : 'bonusPoints',
      dataIndex : 'bonusPoints',
      render:(val, record)=> {
        return record.assigneeBonusPoints + record.participatorBonusPoints + record.ownerBonusPoints;
      }
    }, {
      title : '责任人积分',
      key : 'assigneeBonusPoints',
      dataIndex : 'assigneeBonusPoints',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'ASSIGNEE',
            status: 'COMPLETED',
            assigneeIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '参与人积分',
      key : 'participatorBonusPoints',
      dataIndex : 'participatorBonusPoints',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'PARTICIPATOR',
            status: 'COMPLETED',
            participatorIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }, {
      title : '创建人积分',
      key : 'ownerBonusPoints',
      dataIndex : 'ownerBonusPoints',
      render:(val, record)=>{
        return <div style={{cursor:'pointer'}} onClick={()=>{
          viewTaskList({
            queryType: 'OWNER',
            status: 'COMPLETED',
            participatorIdList: [record.assignee&&record.assignee.id]
          });
        }}>{val}</div>
      }
    }];

    return (
      <div>
        <div style={{paddingBottom:16, textAlign:'center'}}>
          所属日期: <DatePicker.RangePicker value={this.props.timeRange}  onChange={this.props.onChange}/>
        </div>
        <Table columns={columns} {...this.props}/>
      </div>
    );
  }
}

export default StatAll;
