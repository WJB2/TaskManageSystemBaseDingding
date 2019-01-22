import React,{PureComponent} from 'react';

import { SegmentedControl } from 'antd-mobile';

import styles from './ProjectIndex.less';

class ProjectDetailProgress extends PureComponent{

  render(){

    return(
      <div className={styles.projectdetailprogress}>
        <div className={styles.projectseg}>
        <SegmentedControl
          values={['一级项目统计','进度统计']}
          style={{position:'relative',width:'90%',margin:'0 auto',top:'0.15rem'}}
        ></SegmentedControl>


        </div>
      </div>
    )
  }
}

export default ProjectDetailProgress;
