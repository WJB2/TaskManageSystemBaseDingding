import React,{PureComponent} from 'react';

import projectService from '../../services/project/ProjectService';

import styles from './PaneIndex.less';

import {Radio} from 'antd-mobile';

const RadioItem=Radio.RadioItem;

class ProjectPane extends PureComponent{

  state={
    projectList:[],//项目目录
    id:null,//所选标签id
    idArray:[],//id数组
  }

  async componentWillMount(){


    if(this.props.projectId){

      this.setState({
        id:this.props.projectId,
      })

    }

    const projectList=await projectService.findProjectList({deletedFlag:0});

    this.setState({
      projectList:projectList,
    })
  }

  componentDidMount(){

  }

  onChange(id){//选择单选框

    let idArray=[];
    this.setState({
      id:id,
      idArray:idArray,
    })
  }

  render(){

    const {
      projectList,
      idArray,
      id
    }=this.state;

    return(
      <div className={styles.projectPane}>
        <div className={styles.projectPaneLeft} onClick={()=>{
          this.props.onHandleCancel()
        }}>»</div>
        <div className={styles.projectPaneRight}>
          <div className={styles.projectPaneText}>项目</div>
          <div className={styles.projectPaneList}>
            {
              projectList.map((item,index)=>{
                return(
                  <RadioItem
                    key={index}
                    checked={item.id===id}
                    onClick={()=>{
                      this.onChange(item.id)
                    }}>
                    {item.name}
                  </RadioItem>
                )
              })
            }
          </div>
          <div className={styles.projectPaneButton} onClick={()=>{
            this.props.onHandleSubmit(id)
          }}>
            完成
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectPane;
