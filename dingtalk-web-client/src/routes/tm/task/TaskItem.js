import React, {PureComponent} from 'react';
import moment from 'moment';
import {List, Dropdown, Icon, Menu, Tag, Badge} from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label, Guide} from 'bizcharts';
import {View} from '@antv/data-set';

import taskTypeEnum from "../../../enum/tm/TaskTypeEnum";
import TaskGroupSelector from "../../../components/tm/task/TaskGroupSelector";

const  ListItem = List.Item;
const MenuItem = Menu.Item;
const { Html, Arc } = Guide;



const formatStatus = (task)=>{

  if(!task.unreachable&&!task.completed&&!task.archived){
    const days = new Date().getTime()-moment(task.endTime, "YYYYMMDDHHmmssSSS").valueOf()>0?parseInt((new Date().getTime()-moment(task.endTime, "YYYYMMDDHHmmssSSS").valueOf())/(24*60*60*1000) +1):0;

    return (<span style={{marginLeft:8, color:'orange'}}>未完成{days>0?' · 已逾期'+days + '天':''}</span>);
  }

  if(task.archived){
    return (<span style={{marginLeft:8, color:'#2db7f5'}}>已归档</span>);
  }

  if(task.completed){
    return (<span style={{marginLeft:8, color:'#87d068'}}>已完成</span>);
  }

  if(task.unreachable){
    return (<span style={{marginLeft:8, color:'red'}}>无法完成</span>);
  }

}


const TaskItem = ({task, onEdit, onGroupEdit})=>{

  const data = task.progressStatus>0?[
    { item: '已完成', count: task.progressStatus, color:'#c2c2c2'},
    { item: '未完成', count: 100-task.progressStatus, color:'green'},
  ]:[
    { item: '已完成', count: 0, color:'#c2c2c2'},
    { item: '未完成', count: 100, color:'green'},
  ];

  const dv = new View();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: val => {
        return `${val * 100  }%`;
      },
    },
  }

  const menus = (task)=>{
    return (
      <Menu onClick={({ key})=>{
        if(key==='edit'){
          if(onEdit){
            onEdit(task);
          }
        }
      }}
      >
        <MenuItem key="edit">
          <span>基本信息</span>
        </MenuItem>
      </Menu>
    )
  };
  return (
    <ListItem style={{backgroundColor:"#fff", marginTop:16, padding:8, paddingLeft:24, position:'relative'}}>
      {task.label?<div style={{width:3, height:25, position:'absolute', top:0, left:0, backgroundColor:task.label}} />:null}
      <div>
        <div><Tag>{taskTypeEnum.getDisplayText(task.taskType)}</Tag> <span style={{cursor:'pointer', fontWeight:'bold'}} onClick={()=>{
          onEdit(task);
        }}>{task.title}</span></div>
        <div style={{marginTop:8}}>
          <div style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width:20,height:20, borderRadius:10, fontSize:10, textAlign:'center', lineHeight:'20px', display:'inline-block' }} >责</div>
          <span style={{marginLeft:8}}>{task.assigneeList?task.assigneeList.map(item=>item.name).join('、'):''}</span>
        </div>
        <div style={{marginTop:8, lineHeight:'20px', fontSize:12}}>
          <div style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width:20,height:20, borderRadius:10, fontSize:10, textAlign:'center', lineHeight:'20px', display:'inline-block' }} >止</div>
          <span style={{marginLeft:8}}>{moment(task.endTime, 'YYYYMMDDHHmmssSSS').format('YYYY-MM-DD')}</span>
          {formatStatus(task)}
        </div>
        <div style={{marginTop:8, lineHeight:'20px', fontSize:12}}>
          <div style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', width:20,height:20, borderRadius:10, fontSize:10, textAlign:'center', lineHeight:'20px', display:'inline-block', float:'left' }} >组</div>
          <div style={{paddingLeft:24, cursor:'pointer'}}><TaskGroupSelector value={task.groupIdList} onSelect={(groupIdList)=>{
            onGroupEdit({
              domainId:groupIdList,
              taskId:task.id
            });
          }}/></div>
        </div>
      </div>
      <div style={{float:'right', marginLeft:'auto'}}>
        <div style={{float:'left', height:'100%', paddingTop:20, lineHeight:'20px', fontSize:'10px', paddingRight:20}}>
          责任人得分: {task.assigneeBonusPoints} <br/>
          参与人得分: {task.participatorBonusPoints} <br/>
          创建人得分: {task.ownerBonusPoints}
        </div>
        <div style={{float:'left', marginLeft:'auto', width:80, height:80}}>
          <Chart width={80} height={80} data={data} scale={cols} padding={[0, 0, 0, 0]} forceFit>
            <Coord type='polar' startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
            <Axis name='value'
                  zIndex={2}
                  line={null}
                  label={{
                    offset: -16,
                    textStyle: {
                      fontSize: 10,
                      fill: 'rgba(0, 0, 0, 0.25)',
                      textAlign: 'center',
                      textBaseline: 'middle'
                    }}}
                  subTickCount={4}
                  subTickLine={{
                    length: -8,
                    stroke: '#fff',
                    strokeOpacity: 1
                  }}
                  tickLine={{
                    length: -18,
                    stroke: '#fff',
                    strokeOpacity: 1
                  }}
            />
            <Axis name="1" visible ={false} />
            <Guide  >
              <Arc zIndex={0} start={[ 0, 0.965 ]} end={[ 9, 0.965 ]}
                   style={{ // 底灰色
                     stroke: '#000',
                     lineWidth: 8,
                     opacity: 0.09
                   }}/>
              <Arc zIndex={1} start={[ 0, 0.965 ]} end={[ data[0].count/100, 0.965 ]}
                   style={{ // 底灰色
                     stroke: '#1890FF',
                     lineWidth: 8,
                   }}  />
              <Html position={[ '50%', '65%' ]}
                    html={() => {return ('<div style="width: 80px;text-align: center;font-size: 10px!important;"><p style="font-size: 1.4em; color: rgba(0,0,0,0.43); font-weight:bolder; margin: 0;">' + data[0].count + '%</p></div>')}} />
            </Guide>
            <Geom type="point" position="value*1" shape='pointer' color='#1890FF'
                  active={false}
                  style={{stroke: '#fff',lineWidth: 1}}
            />
          </Chart>
        </div>
        <div style={{height:80, lineHeight:'80px', fontSize:24, paddingLeft:16, paddingRight:16, float:'left'}}>
          <Dropdown overlay={menus(task)} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="ellipsis" />
            </a>
          </Dropdown>
        </div>
      </div>
    </ListItem>
  );
};

export default TaskItem;
