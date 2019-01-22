import React,{PureComponent} from 'react';

import styles from '../../routes/profile/ProfileIndex.less';

import HeaderHandler from '../../components/main/HeaderHandler';

class TaskArchivedList extends PureComponent{

  componentDidMount(){

    const {dispatch}=this.props;

    DingTalkUtils.setNavigation('已归档的任务');
    DingTalkUtils.setNavBarLeftFunc(true,"返回",null);
    DingTalkUtils.setNavBarRightFunc(false,false,false,"projecttaskarchived",null);

  }

  render(){

    const {archivedData}=this.props;

    const headerConfig={
      leftTitle:'恢复'
    }

    return(
      <div className={styles.taskarchivedpane}>
        <HeaderHandler {...headerConfig}/>
        {
          archivedData.list.map((item,index)=>{
            return (
              <div  key={index} className={styles.taskarchivedlist}>
                <div>{item.title}</div>
                <div></div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default TaskArchivedList;
