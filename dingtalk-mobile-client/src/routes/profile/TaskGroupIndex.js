import React,{PureComponent} from 'react';

import HeaderHandler from '../../components/main/HeaderHandler';

import DingTalkUtils from '../../utils/DingTalkUtils';

import {List,Button,WingBlank,WhiteSpace} from 'antd-mobile';

import styles from './ProfileIndex.less';

import {connect} from 'dva';

const Item=List.Item;

@connect(models=>({
  profileModel:models['profile/profile'],
}))
class TaskGroupIndex extends PureComponent{

  componentWillMount(){
    const {dispatch}=this.props;

    document.addEventListener('backbutton',(e)=>{
        e.preventDefault();
        DingTalkUtils.closeBrower();

    })

  }

  render(){

    const {
      groupList,onEdit,onAdd,onBack
    }=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'我的群组',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(
      <div className={styles.profileGroup}>

        <HeaderHandler {...headerConfig}/>

        <div className={styles.groupName}>我的群组</div>

        <List >

          {
            groupList.map((item,key)=>{
              return <Item key={key} onClick={()=>{onEdit(item)}}>{item.name}</Item>
            })
          }


        </List>
        <div className={styles.groupButton}>
        <WingBlank>
          <Button type={"primary"} size={"large"} onClick={()=>{onAdd()}}>增加群组</Button>
        </WingBlank>
        </div>

      </div>
    )
  }
}

export default TaskGroupIndex;
