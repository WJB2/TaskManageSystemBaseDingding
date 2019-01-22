import React,{PureComponent} from 'react';
import styles from './TaskIndex.less';
import {Picker} from 'antd-mobile';
import TaskTypeEnum from './../../enum/TaskTypeEnum';
import {Toast} from "antd-mobile/lib/index";

class TaskTypeSelector extends PureComponent{
  constructor(props){
      super(props);

  }

  componentWillMount(){
    if(this.props.value){
      this.setState({
        selectType:this.props.value
      })
    }
  }

  state={
    selectType:null,
    dataSource:[{value:'NORMAL',label:'普通任务'},{value:'CORPORATE',label:'协同任务'}],
    picker:true,
  }

  handleSelectType(e){

      this.setState({
        selectType:e[0]
      })
      this.props.onChange(e[0])
  }

  handleClick(){
    if(this.props.isChange){
      Toast.info('不能选择任务类型',1);
      this.setState({
        picker:false,
      })
    }
  }



  render(){
    return(


      <div className={styles.typeSelector}>
        <div className="iconfont" style={{width:'1.2rem',flexShrink:0,flexGrow:0,paddingLeft:'0.2rem',fontSize:'0.6rem',color:'grey',boxSizing:'border-box'}}>&#xe60c;</div>
        <div className={styles.name}>类型</div>
        <Picker title={"请选择任务类型"} disable={this.state.picker} data={this.state.dataSource} cols={1} onOk={(e)=>this.handleSelectType(e)}>
        <div className={styles.main} onClick={this.handleClick.bind(this)}>
          {!this.state.selectType?<div className={styles.arrow}>
             <div>请选择</div><div className={"iconfont"} style={{marginLeft:'0.35rem'}}>&#xe636;</div>
          </div>:<div className={styles.taskType}>{TaskTypeEnum.getDisplayText(this.state.selectType)}</div>}
        </div>
        </Picker>
      </div>


    )
  }
}
export default TaskTypeSelector;
