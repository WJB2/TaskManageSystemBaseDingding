import React,{ PureComponent } from 'react';

import groupService from '../../services/task/TaskGroupService';

import styles from './PaneIndex.less';

import ComponentUtils from '../../utils/ComponentUtils';

import {List,Radio} from 'antd-mobile';

const RadioItem=Radio.RadioItem;

class GroupPane extends PureComponent{

  state={
    groupList:[],//标签列表
    id:null,//标签的id
  }

  async componentWillMount(){
    const groupList=await groupService.findTaskGroupList({});

    this.setState({
      groupList:groupList,
    })

  }

  onChange(id){//选择单选框

    this.setState({
      id:id,
    })
  }

  handleSubmit(id){//点击完成提交id数组
    const {onHandleSubmit}=this.props;

    if(onHandleSubmit){
      onHandleSubmit(id)
    }
  }

  handleCancel(){
    const {onHandleCancel}=this.props;

    if(onHandleCancel){
      onHandleCancel()
    }

  }

  render(){

    const {
      groupList,
      id,
      idArray,
    }=this.state;

    return(
      <div className={styles.groupPane}>
        <div className={styles.groupPaneLeft} onClick={()=>{
          this.props.onHandleCancel()
        }}>»</div>
        <div className={styles.groupPaneRight}>
          <div className={styles.groupPaneText}>群组</div>
          <div className={styles.groupPaneList}>
            {
              groupList.map((item,index)=>{
                return(
                  <RadioItem
                    key={index}
                    checked={item.id===id}
                    onClick={()=>{
                      this.onChange(item.id)
                    }}>
                    {item.name}
                  </RadioItem>
                )
              })
            }
          </div>
          <div className={styles.groupPaneButton} onClick={()=>{
            this.handleSubmit(id)
          }}>
            完成
          </div>
        </div>
      </div>
    )
  }
}

export default GroupPane;


