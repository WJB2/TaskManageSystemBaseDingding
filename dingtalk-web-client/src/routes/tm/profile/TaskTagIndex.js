import React, {PureComponent} from 'react';

import {Tag, Icon} from 'antd';

class TaskTagIndex extends PureComponent {

  render(){

    const {tagList, onAdd, onEdit} = this.props;

    return (
      <div style={{padding:16}}>
        <div style={{fontSize:18, lineHeight:'50px', height:50, borderBottom:'1px solid #efefef'}}>我的标签</div>

        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5}}>
          <div style={{}}>系统标签</div>
          <div style={{marginTop:16}}>
            {
              tagList.filter((item)=>{
                return item.tagType==='SYSTEM';
              }).map((item)=>{
                return <Tag key={item.id}>{item.name}</Tag>
              })
            }
          </div>
        </div>

        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5, marginTop:16}}>
          <div style={{}}>个人标签</div>
          <div style={{marginTop:16}}>
            {
              tagList.filter((item)=>{
                return item.tagType==='STAFF';
              }).map((item)=>{
                return <Tag key={item.id} onClick={()=>{
                  onEdit(item);
                }}>{item.name}</Tag>
              })
            }
            <Tag onClick={()=>{
              onAdd({
                taskTagFormVisible:true,
                taskTagFormType : 'ADD',
                taskTagType : 'STAFF',
                currentTaskTag:null,
              });
            }}><Icon type={"plus"}/></Tag>
          </div>
        </div>

        <div style={{padding:16, backgroundColor:'rgb(242, 245, 247)', borderRadius:5, marginTop:16}}>
          <div style={{}}>公司标签</div>
          <div style={{marginTop:16}}>
            {
              tagList.filter((item)=>{
                return item.tagType==='ORGANIZATION';
              }).map((item)=>{
                return <Tag key={item.id} onClick={()=>{
                  onEdit(item);
                }}>{item.name}</Tag>
              })
            }
            <Tag onClick={()=>{
              onAdd({
                taskTagFormVisible:true,
                taskTagFormType : 'ADD',
                taskTagType : 'ORGANIZATION',
                currentTaskTag:null,
              });
            }}><Icon type={"plus"}/></Tag>
          </div>
        </div>
        {}
      </div>
    );
  }
}

export default TaskTagIndex;
