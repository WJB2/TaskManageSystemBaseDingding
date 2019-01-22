import React, {PureComponent} from 'react';

import {Tag, Icon} from 'antd';

class TaskGroupIndex extends PureComponent {

  render(){

    const {groupList, onAdd, onEdit} = this.props;

    return (
      <div style={{padding:16}}>
        <div style={{fontSize:18, lineHeight:'50px', height:50, borderBottom:'1px solid #efefef'}}>我的群组</div>

        <div style={{marginTop:16}}>
          {
            groupList.map((item)=>{
              return <Tag key={item.id} onClick={()=>{
                onEdit(item);
              }}>{item.name}</Tag>
            })
          }
          <Tag onClick={()=>{
            onAdd({
              taskGroupFormVisible:true,
              taskGroupFormType : 'ADD',
              currentTaskGroup:null,
            });
          }}><Icon type={"plus"}/></Tag>
        </div>
      </div>
    );
  }
}

export default TaskGroupIndex;
