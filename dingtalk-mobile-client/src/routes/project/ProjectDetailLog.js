import React,{PureComponent} from 'react';

import ButtonComponent from '../../components/main/ButtonHandler';

import HeaderHandler from '../../components/main/HeaderHandler';

import styles from './ProjectIndex.less';

class ProjectDetailLog extends PureComponent{

  render(){
    const { currentProject,onBack }=this.props;

    const buttonConfig={
      uniqueLabel:'icon-xiezi',
      color:'#FFA122',
      zIndex:10
    }

    const headerConfig={
      leftTitle:'退出',
      centerTitle: currentProject.name,
      rightTitle:"更多",
      rightVisible:true,
      onPop:()=>{console.log('2')}
    }

    return(
      <div className={styles.projectDetailLog}>

        {/*<Header {...headerConfig}/>*/}

        <div onClick={()=>onBack()} className={styles.backButton}>返回</div>

      </div>
    )
  }
}

export default ProjectDetailLog;
