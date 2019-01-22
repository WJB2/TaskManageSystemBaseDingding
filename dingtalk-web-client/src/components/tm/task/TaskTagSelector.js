import React, {PureComponent} from 'react';

import {Tag, Icon, Modal} from 'antd';

import tagService from './../../../services/tm/TagService'

class _TaskTagSelectorModel extends PureComponent {

  state = {
    tagIdList:null,
  }

  componentWillMount(){

    this.setState({
      tagIdList:this.props.tagIdList
    })
  }

  handleTagSelect(tagId){
    const tagIdList = this.state.tagIdList||[];
    let nTagIdList = [];

    let has = false;

    for(let i=0; i<tagIdList.length; i++){
      if(tagId===tagIdList[i]){
        has=true;
        continue
      }else{
        nTagIdList.push(tagIdList[i]);
      }
    }

    if(!has){
      nTagIdList.push(tagId);
    }

    this.setState({
      tagIdList: nTagIdList
    });
  }

  render(){
    const {tagList, onCancel, onSelect} = this.props;

    return (
      <Modal onCancel={onCancel} visible={true} onOk={()=>{
        if(onSelect){
          onSelect(this.state.tagIdList);
        }
      }} title={'选择标签'}>
        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5}}>
          <div style={{}}>系统标签</div>
          <div style={{marginTop:16}}>
            {
              tagList&&tagList.filter((item)=>{
                return item.tagType==='SYSTEM';
              }).map((item)=>{
                return <Tag key={item.id} color={this.state.tagIdList&&this.state.tagIdList.indexOf(item.id)>=0?'#2db7f5':''}
                            onClick={()=>{
                  this.handleTagSelect(item.id);
                }}>{item.name}</Tag>
              })
            }
          </div>
        </div>

        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5, marginTop:16}}>
          <div style={{}}>个人标签</div>
          <div style={{marginTop:16}}>
            {
              tagList&&tagList.filter((item)=>{
                return item.tagType==='STAFF';
              }).map((item)=>{
                return <Tag key={item.id} color={this.state.tagIdList&&this.state.tagIdList.indexOf(item.id)>=0?'#2db7f5':''}
                  onClick={()=>{
                  this.handleTagSelect(item.id);
                }}>{item.name}</Tag>
              })
            }
          </div>
        </div>

        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5, marginTop:16}}>
          <div style={{}}>公司标签</div>
          <div style={{marginTop:16}}>
            {
              tagList&&tagList.filter((item)=>{
                return item.tagType==='ORGANIZATION';
              }).map((item)=>{
                return <Tag key={item.id} color={this.state.tagIdList&&this.state.tagIdList.indexOf(item.id)>=0?'#2db7f5':''}
                  onClick={()=>{
                  this.handleTagSelect(item.id);
                }}>{item.name}</Tag>
              })
            }
          </div>
        </div>
      </Modal>
    );
  }
}

class TaskTagSelector extends PureComponent {

  state = {
    value : null,
    tagList : null,
    visible:false,
  }

  async componentWillMount(){
    const tagList = await tagService.findTaskTagList({});

    this.setState({
      tagList,
      value: this.props.value||[]
    });
  }

  handleTagSelect(val){

    if(this.props.onChange){
      this.props.onChange(val);
    }

    this.setState({
      value : val,
      visible:false
    });
  }

  render(){

    const {disabled} = this.props;

    return (
      <div>
        {
          this.state.value&&this.state.tagList&&this.state.value.map((val)=>{
            for(let i=0; i<this.state.tagList.length; i++){
              if(val===this.state.tagList[i].id){
                return <Tag key={val}>{this.state.tagList[i].name}</Tag>
              }
            }
          })
        }
        {!disabled&&<Tag onClick={()=>{
          this.setState({
            visible:true
          });
        }}><Icon type={'plus'} /></Tag>}
        {this.state.visible&&<_TaskTagSelectorModel onSelect={this.handleTagSelect.bind(this)} onCancel={()=>{
          this.setState({
            visible:false
          })
        }} tagIdList={this.state.value} tagList={this.state.tagList} />}
      </div>
    );
  }
}

export default TaskTagSelector;
