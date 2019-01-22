import React, {PureComponent} from 'react';
import  moment from 'moment';

import {Tabs, Input, Button, Switch, Select, Row, Col, DatePicker, Form} from 'antd';

import StaffSelector from './../../../components/system/form/StaffSelector';
import TaskTagSelector from './../../../components/tm/task/TaskTagSelector';

const {TabPane} = Tabs;
const {Search} = Input;
const {Option, OptGroup} = Select;

import styles from './TaskQueryPane.less';
import TaskGroupSelector from "./TaskGroupSelector";
import ProjectSelector from "./ProjectSelector";

class TaskPane extends PureComponent {

  render() {

    const {queryConditions, onSearch, onParamsChange, onQueryConditionsChange, params} = this.props;

    const layout = {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
      lg: {
        span: 8,
      }
    }

    return (
      <div className={styles.pane}>
        <div className={styles.conditionContainer}>
          <Select placeholder="全部" className={styles.searchItem} value={params.status?params.status:'ALL'} onChange={(value)=>{
            if(onSearch){
              onSearch({
                status: value
              });
            }
          }}>
            <Option value={'ALL'}>全部</Option>
            <Option value={'INCOMPLETE'}>未完成的</Option>
            <Option value={'EXPIRED'}>&nbsp;&nbsp;已过期的</Option>
            <Option value={'ONGOING'}>&nbsp;&nbsp;进行中的</Option>
            <Option value={'READY'}>&nbsp;&nbsp;未开始的</Option>
            <Option value={'COMPLETED'}>已完成的</Option>
            <Option value={'UNREACHABLE'}>无法完成的</Option>
            <Option value={'AUDITED'}>已审核</Option>
            <Option value={'ARCHIVED'}>已归档</Option>
          </Select>
          <Select placeholder="截止时间(升序)"  value={params.sortBy?params.sortBy:'CREATED_TIME_DESC'} className={styles.searchItem} onChange={(value)=>{
            if(onSearch){
              onSearch({
                sortBy: value
              });
            }
          }}>
            <Option value={'CREATED_TIME_ASC'}>创建时间(升序)</Option>
            <Option value={'CREATED_TIME_DESC'}>创建时间(降序)</Option>
            <Option value={'END_TIME_ASC'}>截止时间(升序)</Option>
            <Option value={'END_TIME_DESC'}>截止时间(降序)</Option>
            <Option value={'BEGIN_TIME_ASC'}>开始时间(升序)</Option>
            <Option value={'BEGIN_TIME_DESC'}>开始时间(降序)</Option>
          </Select>
          <Select placeholder="添加筛选" mode={'multiple'} maxTagCount={0} className={styles.searchItem} onChange={(values)=>{
            if(onQueryConditionsChange){
              onQueryConditionsChange(values);
            }
          }}>
            <Option value={'beginTime'}>开始时间</Option>
            <Option value={'endTime'}>截止时间</Option>
            <Option value={'completeTime'}>完成时间</Option>
            <Option value={'createdBy'}>创建人</Option>
            <Option value={'assignee'}>责任人</Option>
            <Option value={'supervisor'}>关注人</Option>
            <Option value={'tag'}>标签</Option>
            <Option value={'group'}>群组</Option>
            <Option value={'project'}>项目</Option>
          </Select>

          <div className={styles.right} >
            查看子任务&nbsp;<Switch defaultChecked={true} onChange={(value)=>{
            onSearch({
              includeSubTask:value
            });
          }}/>
          </div>
        </div>

        {queryConditions&&
        queryConditions.length>0&&
        <div className={styles.extraConditionContainer} >
          <Row>
            {queryConditions.indexOf('beginTime')>=0&&
              <Col {...layout} className={styles.searchItemWrapper}>
                <div style={{display: 'flex'}}>
                  <label className={styles.searchLabel}>开始时间：</label>
                  <DatePicker.RangePicker value={params.beginTimeRangeLeft&&params.beginTimeRangeRight?[moment(params.beginTimeRangeLeft, 'YYYYMMDDHHmmssSSS'), moment(params.beginTimeRangeRight, 'YYYYMMDDHHmmssSSS')]:null}
                                          style={{flex: 1}}
                                          onChange={(value)=>{
                    const params = {};
                    if(value[0]){
                      params.beginTimeRangeLeft = value[0].format('YYYY-MM-DD ') + "00:00:00.000";
                    }else{
                      params.beginTimeRangeLeft = '';
                    }

                    if(value[1]){
                      params.beginTimeRangeRight= value[1].format('YYYY-MM-DD ') + "23:59:59.999"
                    }else{
                      params.beginTimeRangeRight = '';
                    }

                    onParamsChange(params);
                  }}/>
                </div>
              </Col>
            }
            {queryConditions.indexOf('endTime')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>截止时间：</label>
                <DatePicker.RangePicker
                  value={params.endTimeRangeLeft&&params.endTimeRangeRight?[moment(params.endTimeRangeLeft, 'YYYYMMDDHHmmssSSS'), moment(params.endTimeRangeRight, 'YYYYMMDDHHmmssSSS')]:null}
                  style={{flex: 1}} onChange={(value)=>{
                  const params = {};
                  if(value[0]){
                    params.endTimeRangeLeft = value[0].format('YYYY-MM-DD ') + "00:00:00.000";
                  }else{
                    params.endTimeRangeLeft = '';
                  }

                  if(value[1]){
                    params.endTimeRangeRight= value[1].format('YYYY-MM-DD ') + "23:59:59.999"
                  }else{
                    params.endTimeRangeRight = '';
                  }

                  onParamsChange(params);
                }}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('completeTime')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>完成时间：</label>
                <DatePicker.RangePicker
                  value={params.completedTimeRangeLeft&&params.completedTimeRangeRight?[moment(params.completedTimeRangeLeft, 'YYYYMMDDHHmmssSSS'), moment(params.completedTimeRangeRight, 'YYYYMMDDHHmmssSSS')]:null}
                  style={{flex: 1}} onChange={(value)=>{
                  const params = {};
                  if(value[0]){
                    params.completedTimeRangeLeft = value[0].format('YYYY-MM-DD ') + "00:00:00.000";
                  }else{
                    params.completedTimeRangeLeft = '';
                  }

                  if(value[1]){
                    params.completedTimeRangeRight= value[1].format('YYYY-MM-DD ') + "23:59:59.999"
                  }else{
                    params.completedTimeRangeRight = '';
                  }

                  onParamsChange(params);
                }}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('createdBy')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>创建人：</label>
                <StaffSelector value={params.createdById} mode={'multiple'} style={{flex: 1}} onChange={(value)=>{
                  onParamsChange({
                    createdById : value
                  });
                }}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('assignee')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>责任人：</label>
                <StaffSelector value={params.assigneeId} mode={'multiple'} style={{flex: 1}} onChange={(value)=>{
                  onParamsChange({
                    assigneeId : value
                  });
                }}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('supervisor')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>关注人：</label>
                <StaffSelector value={params.supervisorId} mode={'multiple'} style={{flex: 1}} onChange={(value)=>{
                  onParamsChange({
                    supervisorId : value
                  });
                }}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('tag')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>标签：</label>
                <TaskTagSelector value={params.tagId} onChange={(value)=>{
                  onParamsChange({
                    tagId : value
                  });
                }} style={{flex: 1}}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('group')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>群组：</label>
                <TaskGroupSelector value={params.groupId} onSelect={(value)=>{
                  onParamsChange({
                    groupId : value
                  });
                }} style={{flex: 1}}/>
              </div>
            </Col>
            }
            {queryConditions.indexOf('project')>=0 &&
            <Col {...layout} className={styles.searchItemWrapper}>
              <div style={{display: 'flex'}}>
                <label className={styles.searchLabel}>群组：</label>
                <ProjectSelector value={params.projectId} onChange={(value)=>{
                  onParamsChange({
                    projectId : value
                  });
                }} style={{flex: 1}}/>
              </div>
            </Col>
            }
            {
              <Col span={24} style={{marginTop:8}}>
                <Button onClick={()=>{
                  onSearch();
                }}>查询</Button>
              </Col>
            }
          </Row>
        </div>
        }
      </div>
    );
  }
}

export default TaskPane;
