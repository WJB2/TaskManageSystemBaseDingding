import React, {PureComponent} from 'react';

import {Tabs, Input, Button, Switch, Select, Row, Col} from 'antd';

import TaskQueryPane from './../../../components/tm/task/TaskQueryPane';

const {TabPane} = Tabs;
const {Search} = Input;
const {Option, OptGroup} = Select;

import styles from './TaskIndex.less';

class TaskPane extends PureComponent {

  render() {

    const {
      queryConditions,
      onSearch,
      onParamsChange,
      onQueryConditionsChange,
      onExport,
      queryType,
      params
    } = this.props;

    const paneConfig = {
      queryConditions,
      onSearch,
      onParamsChange,
      onQueryConditionsChange,
      onExport,
      params
    }

    return (
      <div className={styles.header}>
        <div className={styles.conditionContainer} style={{height:48}}>
          <div className={styles.tabItem + " "   + (queryType==='ASSIGNEE'?styles.tabItemSelected:'')} onClick={()=>{
            onSearch({
              queryType : 'ASSIGNEE'
            });
          }}>
            我负责的
          </div>
          <div className={styles.tabItem + " "  + (queryType==='PARTICIPATOR'?styles.tabItemSelected:'')}  onClick={()=>{
            onSearch({
              queryType : 'PARTICIPATOR'
            });
          }}>
            我参与的
          </div>
          <div className={styles.tabItem + " "  + (queryType==='SUPERVISOR'?styles.tabItemSelected:'')} onClick={()=>{
            onSearch({
              queryType : 'SUPERVISOR'
            });
          }}>
            我关注的
          </div>
          <div className={styles.tabItem + " "  + (queryType==='OWNER'?styles.tabItemSelected:'')}  onClick={()=>{
            onSearch({
              queryType : 'OWNER'
            });
          }}>
            我发起的
          </div>
          <div className={styles.tabItem + " "  + (queryType==='AUDITOR'?styles.tabItemSelected:'')}  onClick={()=>{
            onSearch({
              queryType : 'AUDITOR'
            });
          }}>
            我审核的
          </div>

          <div className={styles.right}>
            <Input placeholder="请输入内容" style={{width:160}} onChange={(e)=>{
              onParamsChange({
                text:e.target.value
              })
            }} onPressEnter={()=>{
              onSearch();
            }}/>
            {/*<Button style={{marginLeft:16}}>导出</Button>*/}
          </div>
        </div>

        <TaskQueryPane {...paneConfig} />

      </div>
    );
  }
}

export default TaskPane;
