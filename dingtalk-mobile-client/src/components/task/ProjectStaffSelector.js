import React,{PureComponent} from 'react';

import staffService from '../../services/system/StaffService';

import ComponentUtils from '../../utils/ComponentUtils';

import styles from './TaskIndex.less';

import { List,InputItem,Checkbox,SearchBar } from 'antd-mobile';

import StaffPane from '../pane/StaffPane';

const Item = List.Item;

class ProjectStaffSelector extends PureComponent{

  state={
    staffList:[],//人员列表
    paneVisible:false,//pane面板是否显示
    values:[],//选择人员id数组
  }

  componentDidMount(){

  }

  handleCancel(){//点击取消隐藏选择面板
    this.setState({
      paneVisible:false,
    })
  }

  async handleSubmit(values){//点击确定传递Id数组

    this.props.onChange(values);

    if(values && values.length>0){
      const staffList=await staffService.findStaffList({
        id:values
      })

      this.setState({
        staffList:staffList
      })

    }

    this.setState({
      paneVisible:false,
    })
  }

  render(){

    const {
      paneVisible,
      staffList
    }=this.state;

    const paneConfig={
      onHandleCancel:this.handleCancel.bind(this),
      onHandleSubmit:this.handleSubmit.bind(this),
    }

    return(
      <div className={styles.projectStaffSelector}>
        <Item
          extra={staffList===[]?"请选择":<div className={styles.projectStaffSelectorBlock}>
            {
              staffList.map((item,index)=>{
                return <div key={index} className={styles.projectStaffSelectorTask} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                  {item.name.substring(item.name.length-2)}
                </div>
              })
            }
          </div>}
          arrow={"horizontal"}
          onClick={()=>{
            this.setState({
              paneVisible:true,
            })
          }}
        >项目成员</Item>
        {paneVisible && <StaffPane {...paneConfig} />}
      </div>
    )
  }
}


export default ProjectStaffSelector;
