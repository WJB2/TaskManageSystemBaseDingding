import React, {PureComponent} from 'react';

import {List, Dropdown, Icon, Menu} from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label, Guide} from 'bizcharts';
import {View} from '@antv/data-set';

import styles from './ProjectIndex.less';

const  ListItem = List.Item;
const MenuItem = Menu.Item;
const { Html } = Guide;

class ProjectList extends PureComponent {

  handleViewProjectTaskList(project){
    const {onViewProjectTaskList} = this.props;

    if(onViewProjectTaskList){
      onViewProjectTaskList(project);
    }
  }

  render() {
    const {list, pagination, onEdit} = this.props;

    const projectItemRender = (project)=>{

      const data = project.taskCounts>0?[
        { item: '已完成', count: project.finishedTaskCounts, color:'#c2c2c2'},
        { item: '未完成', count: project.unfinishedTaskCounts, color:'green'},
      ]:[
        { item: '', count: 1, color:'#c2c2c2'},
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

          const menus = (project)=>{
            return (
              <Menu onClick={({ key})=>{
                if(key==='edit'){
                  if(onEdit){
                    onEdit(project);
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
          {project.label?<div style={{width:3, height:25, position:'absolute', top:0, left:0, backgroundColor:project.label}} />:null}
          <div style={{height:60, lineHeight:"60px"}}>
            <span onClick={()=>{
              this.handleViewProjectTaskList(project);
            }} style={{cursor:'pointer'}}><h2>{project.name}</h2></span>
          </div>
          <div style={{float:'right', marginLeft:'auto'}}>
            <div style={{float:'left', marginLeft:'auto', width:60, height:60}}>
              <Chart width={60} height={60} data={dv} scale={cols} padding={[0, 0, 0, 0]} forceFit>
                <Coord type="theta" radius={0.8} innerRadius={0.6} />
                <Axis name="percent" />
                <Guide>
                  <Html position={[ '50%', '50%' ]} alignX='middle' alignY='middle' html={`<div style='width:60px; font-size:1.6em; color:#000; text-align: center;'>${project.taskCounts}</div>`} />
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color='color'
                  tooltip={['item*percent',(item, percent) => {
                  percent = `${percent * 100  }%`;
                  return {
                    name: item,
                    value: percent,
                  };
                }]}
                  style={{lineWidth: 1,stroke: '#fff'}}
                />
              </Chart>
            </div>
            <div style={{height:60, lineHeight:'60px', fontSize:24, paddingLeft:16, paddingRight:16, float:'left'}}>
              <Dropdown overlay={menus(project)} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="ellipsis" />
                </a>
              </Dropdown>
            </div>
          </div>
        </ListItem>
      );
    };

    return (
      <List
        dataSource={list}
        pagination={pagination}
        renderItem={
        projectItemRender
      }
        style={{padding:16}}
      />
    );
  }
}

export default ProjectList;
