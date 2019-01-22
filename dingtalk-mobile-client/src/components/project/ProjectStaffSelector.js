import React,{PureComponent} from 'react';

import ComponentUtils from '../../utils/ComponentUtils';

import styles from './ProjectIndex.less';

import { List,InputItem,Checkbox,SearchBar } from 'antd-mobile';

import StaffPane from '../pane/StaffPane';

import staffService from "../../services/system/StaffService";
import {Toast} from "antd-mobile/lib/index";
import DingTalkMobile from "dingtalk-jsapi";
import DingTalkStaffService from "../../services/dingtalk/DingTalkStaffService";

const Item = List.Item;

class ProjectStaffSelector extends PureComponent{

  state={
    staffList:[],//人员列表
    pickerDingTalkStaff:[],//选择的人员
  }

  async componentWillMount(){

    if(this.props.value){
      const staffList=await staffService.findStaffList({
        id:this.props.value
      })

      const pickerDingTalkStaff=await DingTalkStaffService.convertStaffIdToDingtalkUserId({staffId:this.props.value});

      console.log(pickerDingTalkStaff);

      this.setState({
        staffList:staffList,
        pickerDingTalkStaff:pickerDingTalkStaff,
      })
    }
  }

  handleShowStaffPane(){
    const {globalModel}=this.props;

    const _this=this;

    DingTalkMobile.biz.contact.complexPicker({
        title:'选人',
        corpId:globalModel.corpId,
        multiple:true,
        limitTips:"超出了",
        maxUsers:1000,
        pickedUsers:this.state.pickerDingTalkStaff,
        permissionType:"GLOBAL",
        onSuccess: function(result) {
          console.log("选人成功");
          _this.handleDingStaffSubmit(result);
        },
        onFail : function(err) {console.log("w")}
    })
  }

  async handleDingStaffSubmit(staffValues){//点击提交

    const staffDingTalkIdList=[];//钉钉id列表

    const staffDingTalkList=[];//钉钉人员列表

    staffValues.users.map((item, index)=>{
      staffDingTalkIdList.push(item.emplId);
    })

    const staffIdList=await DingTalkStaffService.convertDingtalkUserIdToStaffId({dingtalkUserId:staffDingTalkIdList});

    staffValues.users.map((item, index)=>{
      staffDingTalkList.push({avatar:item.avatar,name:item.name})
    })

    this.setState({
      staffList:staffDingTalkList,
      pickerDingTalkStaff:staffDingTalkIdList,
    })

    this.props.onChange(staffIdList);

  }


  render(){

    const {
      staffList
    }=this.state;

    return(
      <div className={styles.projectSelector}>
        <Item
          extra={ComponentUtils.isEmpty(staffList)?"请选择":<div className={styles.projectSelectorBlock}>
            {
              staffList.map((item,index)=>{
                return <div key={index} className={styles.projectSelectorList} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                  {item.name.substring(item.name.length-2)}
                </div>
              })
            }
          </div>}
          arrow={"horizontal"}
          onClick={this.handleShowStaffPane.bind(this)}
        >{this.props.label}</Item>

      </div>
    )
  }
}


export default ProjectStaffSelector;
