import React,{PureComponent} from 'react';

import QueueAnim from 'rc-queue-anim';

import styles from './ProfileIndex.less';

import HeaderHandler from '../../components/main/HeaderHandler';

import TagForm from './TagForm';

import {connect} from 'dva';

import TagColorEnum from '../../enum/TagColorEnum';
import DingTalkUtils from "../../utils/DingTalkUtils";


@connect(models=>({
  profileModel:models['profile/profile']
}))
class ProfileTag extends PureComponent{

  componentWillMount(){
    const {dispatch}=this.props;
    document.addEventListener('backbutton',(e)=>{
      e.preventDefault();
      DingTalkUtils.closeBrower();
    })
  }



  handleTagBack(){
    const {dispatch}=this.props;
    dispatch({
      type:'profile/profile/updateState',
      payload:{
        staffAddComponentVisible:false,
      }
    })
  }

  render(){

    const {data,staffAddComponentVisible,onAdd,onSubmit,onChangeRadio,
      staffComponentDefault,onEdit,currentTaskTag,taskTagFormType,onBack,
      onDelete}=this.props;

    const {list}=data;

    const staffTagConfig={
      onSubmit:onSubmit,
      onDelete:onDelete,
      currentTaskTag:currentTaskTag,
      taskTagFormType:taskTagFormType,
      onChangeRadio:onChangeRadio,
      staffComponentDefault:staffComponentDefault,
      onBack:this.handleTagBack.bind(this),
    }

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'我的标签',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(
      <div className={styles.profileTag}>

        <HeaderHandler {...headerConfig} />

        <div className={styles.profileText}>系统标签</div>

        {
          list.filter((item)=>{
            return item.tagType=="SYSTEM"
          }).map((item,key)=>{
            return  <div key={key} className={styles.profileSystemList}>
              <div  style={{backgroundColor:`${TagColorEnum.getDisplayColor(item.label)}`}}></div>
              <div className={styles.profileTextA}>{item.name}</div>
            </div>
          })
        }

        <div className={styles.profileStaff}>
          <div className={styles.profileStaffText}>个人标签</div>
          <div  className={styles.profileStaffPlus} onClick={()=>{onAdd()}}>
            <div className={styles.after}></div>
          </div>
        </div>

          {
            list.filter((item)=>{
              return item.tagType=="STAFF"
            }).map((item,key)=>{
              return  <div key={key} className={styles.profileSatffTag} onClick={()=>{
                onEdit(item)
              }}>
                <div  style={{backgroundColor:`${TagColorEnum.getDisplayColor(item.label)}`}}></div>
                <div className={styles.profileStaffText}>{item.name}</div>
              </div>
            })
          }


        <div className={styles.profileOrangationTag}>公司标签</div>

        {staffAddComponentVisible && <TagForm {...staffTagConfig}/>}

      </div>
    );
  }
}
export default ProfileTag;
