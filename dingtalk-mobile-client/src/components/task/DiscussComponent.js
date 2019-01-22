import React,{PureComponent} from 'react';
import {TextareaItem,List} from 'antd-mobile';
import HeaderHandler from './../main/HeaderHandler';
import DingTalkUtils from './../../utils/DingTalkUtils';
import styles from './TaskIndex.less';

class DiscussComponent extends PureComponent{
  render(){

    const {getFieldProps,onCancelDiscuss}=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'跟进讨论',
      rightVisible:true,
      rightTitle:'取消',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onCancelDiscuss()}
    }

    return(
      <div className={styles.discussIndex}>

        <HeaderHandler  {...headerConfig}/>

          <TextareaItem
            {...getFieldProps('note1')}
            rows={6}
            placeholder="请输入评论内容"
          />

        <div className={styles.discussButton}>发送</div>

      </div>
    )
  }
}

export default DiscussComponent;
