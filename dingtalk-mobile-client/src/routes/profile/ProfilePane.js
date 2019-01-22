import React,{PureComponent} from 'react';

import styles from './ProfileIndex.less';

import HeaderHandler from '../../components/main/HeaderHandler';

import DingTalkUtils from '../../utils/DingTalkUtils';

class ProfilePane extends PureComponent{
  render(){

    const { onShowTag,onShowSuspended,onShowArchived,onShowGroup, position }=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'我的',
      rightVisible:false,
      onQuit:()=>{DingTalkUtils.closeBrower()}
    }

    return(
      <div className={styles.profilepane}>
        <HeaderHandler {...headerConfig}/>
        <div className={styles.mineblock}>
          <div className={styles.mineradius}><div className="iconfont">&#xe670;</div></div>
          <div className={styles.minename}>{position?position.staff?position.staff.name:'':''}</div>
        </div>

        <div className={styles.mineline}>

          <div className={styles.minethree}
               style={{borderBottom:'1px solid #DDDDDD'}}
               onClick={()=>{
                 onShowSuspended()
               }}>
            <span className={"iconfont"}>&#xe651;</span>
            <span>我的挂起</span>
          </div>

          <div className={styles.minethree}
               style={{borderBottom:'1px solid #DDDDDD'}}
               onClick={()=>{
                 onShowArchived()
               }}>
            <span className={"iconfont"}>&#xe605;</span>
            <span>我的归档</span>
          </div>

          <div className={styles.minethree} onClick={()=>{
            onShowTag();
          }} style={{borderBottom:'1px solid #DDDDDD'}}>
            <span className={"iconfont"}>&#xe62b;</span>
            <span>我的标签</span>
          </div>

          <div className={styles.minethree} onClick={()=>{
            onShowGroup();
          }} style={{borderBottom:'1px solid #DDDDDD'}}>
            <span className={"iconfont"}>&#xe673;</span>
            <span>我的群组</span>
          </div>

        </div>

        {/*<div className={styles.mineconfig}>*/}
          {/*<div style={{borderBottom:'1px solid #DDDDDD'}} onClick={()=>{*/}
            {/*this.handleClickTabBar("/mineconfig")*/}
          {/*}} className={styles.minethree}>*/}
            {/*<span className={"iconfont"}>&#xe612;</span>*/}
            {/*<span>个人设置</span>*/}
          {/*</div>*/}
        {/*</div>*/}

        {/*<div className={styles.mineinfo}>*/}
          {/*<div className={styles.minethree} style={{borderBottom:'1px solid #DDDDDD'}}>*/}
            {/*<span className={"iconfont"}>&#xe66e;</span>*/}
            {/*<span>帮助中心</span>*/}
          {/*</div>*/}
          {/*<div className={styles.minethree} style={{borderBottom:'1px solid #DDDDDD'}}>*/}
            {/*<span className={"iconfont"}>&#xe71f;</span>*/}
            {/*<span>收费中心</span>*/}
          {/*</div>*/}
          {/*<div className={styles.minethree}>*/}
            {/*<span className={"iconfont"}>&#xe641;</span>*/}
            {/*<span>更新日志</span>*/}
          {/*</div>*/}
        {/*</div>*/}

      </div>
    )
  }
}

export default ProfilePane;
