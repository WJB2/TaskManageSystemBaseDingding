import React,{PureComponent} from 'react';

import ProjectPane from '../pane/ProjectPane';

import { List,InputItem,Checkbox,SearchBar,Toast } from 'antd-mobile';

import projectService from '../../services/project/ProjectService';

import ComponentUtils from '../../utils/ComponentUtils';

import styles from './TaskIndex.less';

const Item = List.Item;

class ProjectSelector extends PureComponent{

  state={
    paneVisible:false,//标签选择面板是否显示
    projectId:[],//项目id
    currentProject:null,//当前项目
  }

  async componentWillMount(){

    if(this.props.value){
      const currentProject=await projectService.findProjectById({
        id:this.props.value
      })

      this.setState({
        currentProject:currentProject,
        projectId:this.props.value,
      })
    }
  }

  handleCancel(){//点击蒙层取消选择框
    this.setState({
      paneVisible:false,
    })
  }

  async handleSubmit(values){//点击完成提交array数组

    this.props.onChange(values);

    if(values){
      const currentProject=await projectService.findProjectById({
        id:values
      })

      this.setState({
        currentProject:currentProject,
        projectId:values
      })
    }

    this.setState({
      paneVisible:false,
    })

  }

  handleClick(){
    if(this.props.isChange){
     Toast.info('项目已不能点击',1)
    }else{
      this.setState({
        paneVisible:true,
      })
    }
  }

  render(){

    const {
      paneVisible,
      currentProject
    }=this.state;

    const paneConfig={
      projectId:this.state.projectId,
      onHandleCancel:this.handleCancel.bind(this),
      onHandleSubmit:this.handleSubmit.bind(this),
    }

    return(
      <div className={styles.projectSelector}>

        <div className={"iconfont"} style={{width:'1.2rem',paddingLeft:'0.2rem',fontSize:'0.8rem',color:'grey',boxSizing:'border-box'}}>&#xe63a;</div>
        <div className={styles.projectName}>项目</div>
        <div className={styles.projectMain}  onClick={()=>{this.handleClick()}}>
          {currentProject===null?<div className={styles.projectRight}><div className={styles.projectRightLeft}>请选择</div>
            <div className={"iconfont"}>&#xe636;</div></div>:<div className={styles.projectWrapper}>{currentProject.name}</div>}
        </div>

        {paneVisible && <ProjectPane {...paneConfig}/>}

      </div>
    )
  }
}

export default ProjectSelector;
