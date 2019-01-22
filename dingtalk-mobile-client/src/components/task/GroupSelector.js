import React,{PureComponent} from 'react';

import GroupPane from '../pane/GroupPane';

import { List,InputItem,Checkbox,SearchBar,Toast } from 'antd-mobile';

import groupService from '../../services/task/TaskGroupService';

import styles from './TaskIndex.less';

const Item = List.Item;

class GroupSelector extends PureComponent{

  state={
    paneVisible:false,//标签选择面板是否显示
    values:[],//项目id
    currentProject:null,//当前项目
  }

  async componentWillMount(){

    if(this.props.value){
      const currentProject=await groupService.findTaskGroupById({
        id:this.props.value
      })

      this.setState({
        currentProject:currentProject,
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
      const currentProject=await groupService.findTaskGroupById({
        id:values
      })

      this.setState({
        currentProject:currentProject,
      })
    }

    this.setState({
      paneVisible:false,
    })

  }

  handleClick(){
    if(this.props.isChange){
      Toast.info('该数组你不能点击',1)
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
      onHandleCancel:this.handleCancel.bind(this),
      onHandleSubmit:this.handleSubmit.bind(this),
    }

    return(
      <div className={styles.groupSelector}>

        <div className={"iconfont"} style={{width:'1.2rem',paddingLeft:'0.2rem',fontSize:'0.8rem',color:'grey',boxSizing:'border-box'}}>&#xe63a;</div>
        <div className={styles.groupName}>项目</div>
        <div className={styles.groupMain}  onClick={()=>{this.handleClick()}}>
          {currentProject===null?<div className={styles.groupRight}><div className={styles.groupRightLeft}>请选择</div>
            <div className={"iconfont"}>&#xe636;</div></div>:<div className={styles.groupWrapper}>{currentProject.name}</div>}

        </div>
        {paneVisible && <GroupPane {...paneConfig}/>}
      </div>
    )
  }
}

export default GroupSelector;
