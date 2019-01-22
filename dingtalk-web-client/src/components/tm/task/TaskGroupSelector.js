import React, {PureComponent} from 'react';

import {Tag, Icon, Modal} from 'antd';

import taskGroupService from './../../../services/tm/TaskGroupService'

class _TaskGroupSelectorModel extends PureComponent {

  state = {
    groupIdList:null,
  }

  componentWillMount(){

    this.setState({
      groupIdList:this.props.groupIdList
    })
  }

  handleGroupSelect(tagId){
    const groupIdList = this.state.groupIdList||[];
    let nGroupIdList = [];

    let has = false;

    for(let i=0; i<groupIdList.length; i++){
      if(tagId===groupIdList[i]){
        has=true;
        continue
      }else{
        nGroupIdList.push(groupIdList[i]);
      }
    }

    if(!has){
      nGroupIdList.push(tagId);
    }

    this.setState({
      groupIdList: nGroupIdList
    });
  }

  render(){
    const {groupList, onCancel, onSelect} = this.props;

    return (
      <Modal onCancel={onCancel} visible={true} onOk={()=>{
        if(onSelect){
          onSelect(this.state.groupIdList);
        }
      }} title={'选择群组'}>
        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5}}>
          <div style={{marginTop:16}}>
            {
              groupList&&groupList.map((item)=>{
                return <Tag key={item.id} color={this.state.groupIdList&&this.state.groupIdList.indexOf(item.id)>=0?'#2db7f5':''}
                            onClick={()=>{
                  this.handleGroupSelect(item.id);
                }}>{item.name}</Tag>
              })
            }
          </div>
        </div>
      </Modal>
    );
  }
}

class TaskGroupSelector extends PureComponent {

  state = {
    value : null,
    groupList : null,
    visible:false,
  }

  async componentWillMount(){
    const groupList = await taskGroupService.findTaskGroupList({});

    this.setState({
      groupList,
      value : this.props.value||[]
    });
  }

  render(){

    const {disabled, onSelect} = this.props;

    return (
      <div>
        {
          this.state.value&&this.state.groupList&&this.state.value.map((val)=>{
            for(let i=0; i<this.state.groupList.length; i++){
              if(val===this.state.groupList[i].id){
                return <Tag key={val}>{this.state.groupList[i].name}</Tag>
              }
            }
          })
        }
        {!disabled&&<Tag onClick={()=>{
          this.setState({
            visible:true
          });
        }}><Icon type={'plus'} /></Tag>}
        {this.state.visible&&<_TaskGroupSelectorModel onSelect={(val)=>{

          onSelect(val);
          this.setState({
            value:val,
            visible:false
          })
        }} onCancel={()=>{
          this.setState({
            visible:false
          })
        }} groupIdList={this.props.value} groupList={this.state.groupList} />}
      </div>
    );
  }
}

export default TaskGroupSelector;
