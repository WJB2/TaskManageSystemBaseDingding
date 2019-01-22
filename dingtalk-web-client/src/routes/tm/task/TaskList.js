import React, {PureComponent} from 'react';
import {View} from '@antv/data-set';
import {List} from 'antd';

import TaskItem from './TaskItem';

import styles from './TaskIndex.less';

class TaskList extends PureComponent {

  render() {
    const {list, pagination, onEdit, onGroupEdit, extraAction} = this.props;

    return (
      <List
        dataSource={list}
        pagination={pagination}
        renderItem={
          (item)=>{
            return <TaskItem task={item} onEdit={onEdit} onGroupEdit={onGroupEdit} />
          }
        }
        style={{padding:16}}
      />
    );
  }
}

export default TaskList;
