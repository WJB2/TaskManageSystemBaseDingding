import React, {Component, PureComponent} from 'react';
import { connect } from 'dva';
import moment from 'moment';

import {Row, Col, Card, Badge, Tag, Avatar, Icon, Table} from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label, Guide, Facet} from 'bizcharts';
import DataSet from "@antv/data-set";

import TaskTypeEnum from './../../../enum/tm/TaskTypeEnum';
import TaskList from './../task/TaskList';

import styles from './HomeIndex.less';

class ReportItem extends PureComponent {

  render(){
    const {title, unbegin, underway, expired, viewTaskList, queryType} = this.props;

    const data = [{
      count : unbegin?unbegin:0,
      item : '未开始',
    }, {
      count : underway?underway:0,
      item : '进行中',
    }, {
      count : expired?expired:0,
      item : '已过期',
    }];

    const totalCount = data[0].count +  data[1].count + data[2].count;

    if(data[0].count===0&&data[1].count===0&&data[2].count===0){
      data[0].count=1;
      data[1].count=1;
      data[2].count=1;
    }

    const { DataView } = DataSet;
    const { Html } = Guide;

    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };

    return (
      <div style={{display:'flex'}}>
        <div style={{width:100, fontSize:12}}>
          <h3>{title}</h3>
          <div style={{cursor:'pointer'}} onClick={()=>{
            viewTaskList({
              queryType,
              status: 'READY'
            });
          }}><Badge status="warning" />未开始 : {unbegin?unbegin:0}</div>
          <div style={{cursor:'pointer'}} onClick={()=>{
            viewTaskList({
              queryType,
              status: 'ONGOING'
            });
          }}><Badge status="success" />进行中 : {underway?underway:0}</div>
          <div style={{cursor:'pointer'}} onClick={()=>{
            viewTaskList({
              queryType,
              status: 'EXPIRED'
            });
          }}><Badge status="error" />已过期 : {expired?expired:0}</div>
        </div>
        <div style={{flex:1}}>
          <div onClick={()=>{
            viewTaskList({
              queryType,
              status: 'INCOMPLETE'
            });
          }} style={{width:150, height:150, marginLeft:'auto', marginRight:'auto'}}>
            <Chart
              height={150}
              width={150}
              data={dv}
              scale={cols}
              padding={[0, 0, 0, 0]}
              forceFit
            >
              <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
              <Axis name="percent" />
              <Guide>
                <Html
                  position={["50%", "50%"]}
                  html={"<div style='text-align:center; width:150px; font-size:24px; font-weight:bolder; cursor:pointer;'>" + totalCount + "</div>"}
                  alignX="middle"
                  alignY="middle"
                />
              </Guide>
              <Geom
                type="intervalStack"
                position="percent"
                color={['item', (item)=>{
                  if(item==='未开始'){
                    return "#faad14"
                  }else if(item==='进行中'){
                    return '#52c41a'
                  }if(item==='已过期'){
                    return '#f5222d'
                  }
                }]}
                tooltip={[
                  "item*percent",
                  (item, percent) => {
                    percent = percent * 100 + "%";
                    return {
                      name: item,
                      value: percent
                    };
                  }
                ]}
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
              >
              </Geom>
            </Chart>
          </div>
        </div>
      </div>
    );
  }
}

class TaskItem extends PureComponent {

  render() {

    const {log, onTaskClicked} = this.props;

    return (
      <div className={styles.taskItem}>
        <div>
          <div style={{float:'left'}}>
            <Avatar size="large" icon="user" />
          </div>
          <div style={{float:'left', paddingLeft:8}}>
            <div>{log.operateBy.name + " " + log.description}</div>
            <div style={{fontSize:12, lineHeight:"24px"}}>{log.logAmount} 条动态</div>
          </div>
          <div style={{float:'right'}}>
            <Icon type="up-square-o" style={{fontSize:16}}/>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
        <div className={styles.title} onClick={()=>{
          onTaskClicked(log.task.id);
        }}>
          {log&&log.task&&log.task.title}
        </div>
        <div style={{marginTop:12, fontSize:14}}>
          {log.operateTime?moment(log.operateTime, "YYYYMMDDHHmmssSSS").format("YYYY-MM-DD HH:mm:ss"):''}
          <div style={{float:'right'}}>
            <Tag>{log.task?TaskTypeEnum.getDisplayText(log.task.taskType):''}</Tag>
          </div>
        </div>
      </div>
    );
  }
}

@connect(models => ({
  globalModel: models.global,
  homeModel: models['tm/home'],
}))
class HomeIndex extends Component {

  componentWillMount(){

    const {dispatch, globalModel} = this.props;

    dispatch({
      type : 'tm/home/initData',
      payload:{
        staffId : globalModel.position.staffId
      }
    });
  }

  handleReportItemClick(params){
    const {dispatch, globalModel} = this.props;

    dispatch({
      type : 'tm/home/viewTaskList',
      payload: params
    });
  }

  editGroupAction(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskGroup',
      payload,
    });
  }

  editActionHandler(payload){
    const {dispatch} = this.props;

    dispatch({
      type : 'tm/task/editTaskAction',
      payload,
    });
  }

  render(){

    const {globalModel, homeModel, dispatch} = this.props;
    const {ownerTasks, assigneeTasks, supervisorTasks, data, bonusPointsReport, participatorTasks, auditTaskList} = homeModel;

    return (
      <div style={{padding:16}}>

        <Row gutter={8}>
          <Col span={24}>
            <Card title={"我的任务"}>
              <Row>
                <Col span={6}>
                  <ReportItem viewTaskList={this.handleReportItemClick.bind(this)} title={"我发起的"} queryType={'OWNER'} {...ownerTasks}/>
                </Col>
                <Col span={6}>
                  <ReportItem viewTaskList={this.handleReportItemClick.bind(this)} title={"我关注的"} queryType={'SUPERVISOR'} {...supervisorTasks}/>
                </Col>
                <Col span={6}>
                  <ReportItem viewTaskList={this.handleReportItemClick.bind(this)} title={"我负责的"} queryType={'ASSIGNEE'} {...assigneeTasks}/>
                </Col>
                <Col span={6}>
                  <ReportItem viewTaskList={this.handleReportItemClick.bind(this)} title={"我参与的"} queryType={'PARTICIPATOR'} {...participatorTasks}/>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{marginTop:16}}>
            <Card title={"我的任务统计"}>
              <div style={{height:36, lineHeight:"36px", textAlign:'center', marginTop:32}}>
                共完成 <span style={{fontSize:36, fontWeight:'bold'}}>{bonusPointsReport?bonusPointsReport.completed:0}</span> 个任务，
                获得 <span style={{fontSize:36, fontWeight:'bold'}}>{bonusPointsReport?bonusPointsReport.assigneeBonusPoints+
                bonusPointsReport.participatorBonusPoints+
                bonusPointsReport.ownerBonusPoints:0}</span> 积分
              </div>
              <div style={{textAlign:'center', marginTop:24, marginBottom:36}}>
                创建人积分<span style={{fontSize:18, fontWeight:'bolder'}}>&nbsp;{bonusPointsReport.ownerBonusPoints}&nbsp;</span>个&nbsp;&nbsp;
                负责人积分<span style={{fontSize:18, fontWeight:'bolder'}}>&nbsp;{bonusPointsReport.assigneeBonusPoints}&nbsp;</span>个&nbsp;&nbsp;
                参与人积分<span style={{fontSize:18, fontWeight:'bolder'}}>&nbsp;{bonusPointsReport.participatorBonusPoints}&nbsp;</span>个
              </div>
            </Card>
          </Col>
        </Row>

        <Card title={"待我审核"}  bodyStyle={{padding:0}}
              extra={<span onClick={()=>{this.handleReportItemClick({
                queryType: "AUDITOR",
                status: 'COMPLETED'
              })}} style={{cursor:'pointer'}}>更多 <Icon type={'plus'} /></span>}
              style={{marginTop:16}}>
          <TaskList list={auditTaskList} onEdit={this.editActionHandler.bind(this)} onGroupEdit={this.editGroupAction.bind(this)} extraAction={false}  />
        </Card>

        <Card title={"任务动态"} style={{marginTop:16}}>
          <Row gutter={8}>
            {
              data.list&&data.list.map((log)=>{
                return (
                  <Col span={8} key={log.id}>
                    <TaskItem log={log} onTaskClicked={(taskId)=>{
                      dispatch({
                        type : 'tm/task/editTaskAction',
                        payload:{
                          id:taskId
                        },
                      });
                    }}/>
                  </Col>
                )
              })
            }
          </Row>
        </Card>
      </div>
    );
  }
}

export default HomeIndex;
