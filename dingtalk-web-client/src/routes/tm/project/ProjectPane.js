import React, {PureComponent} from 'react';

import {Tabs, Input, Button, Switch, Select, Row, Col} from 'antd';

import TaskQueryPane from './../../../components/tm/task/TaskQueryPane';

import styles from './ProjectIndex.less';

const {TabPane} = Tabs;
const {Search} = Input;
const {Option, OptGroup} = Select;

class ProjectPane extends PureComponent {

  render() {

    const {onAdd, onParamsChange, onSearch} = this.props;

    return (
      <div className={styles.header}>
        <div className={styles.conditionContainer} style={{height:48}}>
          <div className={styles.tabItem}>
            项目
          </div>

          <div className={styles.right}>
            <Input.Search
              placeholder="请输入内容"
              style={{width:180}}
              onKeyDown={
                (e)=>{
                  if(e.keyCode===13){
                    if(onSearch){
                      onSearch({});
                    }
                  }else if(onParamsChange){
                      onParamsChange({
                        projectText: e.target.value,
                      });
                    }
                }
              }
            />
          </div>
        </div>
        <div className={styles.conditionContainer}>
          <Select
            placeholder="名称(升序)"
            className={styles.searchItem}
            onChange={
            (value)=>{
              if(onSearch){
                onSearch({
                  sortBy:value,
                });
              }
            }
          }
          >
            <Option value="NAME_ASC">名称(升序)</Option>
            <Option value="NAME_DESC">名称(降序)</Option>
            <Option value="TIME_ASC">时间(升序)</Option>
            <Option value="TIME_DESC">时间(降序)</Option>
          </Select>
          <Button
            style={{marginLeft:8}}
            onClick={()=>{
            if(onAdd){
              onAdd();
            }
          }}
          >添加项目
          </Button>

          <div className={styles.right} style={{cursor:'pointer'}} >
            查看归档项目
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectPane;
