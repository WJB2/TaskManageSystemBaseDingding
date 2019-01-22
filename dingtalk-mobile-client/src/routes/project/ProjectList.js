import React,{PureComponent} from 'react';

import styles from './ProjectIndex.less';

import CircularSchedule from '../../components/main/CircularSchedule';

import ProjectMenu from './ProjectMenu';

class ProjectList extends PureComponent{

  handleCancel(){
    const {onHandleCancel}=this.props;
    if(onHandleCancel){
      onHandleCancel()
    }
  }


  render(){

    const {
      filterProject,onEdit
    }=this.props;

    console.log(filterProject)

    const circularConfig={
      dataArray:[
        {name:'projectTask',percent:100,a:'1'}
      ],
      sideLength:60,
      borderWidth:0.9,
      colorArray:['#5B88CB'],

    }

    const menuConfig={
      onHandleCancel:this.handleCancel.bind(this),
    }

    return(
      <div className={styles.projectList}>

        {/*<ProjectMenu {...menuConfig}/>*/}

        <div className={styles.projectSum}>
          {
            filterProject.map((item,index)=>{
              return <div key={index} className={styles.projectinlist} onClick={()=>{
                onEdit(item)}
              }>
                <div className={styles.canvas}><CircularSchedule id={`projecttask${index}`}currentSums={item.taskCounts} {...circularConfig} /></div>
                <div className={styles.projectlistdiv1}></div>
                <div className={styles.projectlistdiv2}>
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
export default ProjectList;
