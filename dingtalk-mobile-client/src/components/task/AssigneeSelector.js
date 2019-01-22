import React,{PureComponent} from 'react';

import staffService from '../../services/system/StaffService';

import DingTalkStaffService from '../../services/dingtalk/DingTalkStaffService';

import ComponentUtils from '../../utils/ComponentUtils';

import styles from './TaskIndex.less';

import { List,Toast } from 'antd-mobile';

import DingTalkMobile from "dingtalk-jsapi";

const Item = List.Item;

class AssigneeSelector extends PureComponent{

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

    if(this.props.isChange){
      Toast.info('当前负责人不可点击',1)
    }else{

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

  async componentWillReceiveProps (nextProps) {
    if(nextProps.value){
      const staffList=await staffService.findStaffList({
        id:nextProps.value
      })

      const pickerDingTalkStaff=await DingTalkStaffService.convertStaffIdToDingtalkUserId({staffId:nextProps.value});

      console.log(pickerDingTalkStaff);

      this.setState({
        staffList:staffList,
        pickerDingTalkStaff:pickerDingTalkStaff,
      })
    }
  }

  render(){

    const {
      staffList,
    }=this.state;

    return(
      <div className={styles.assigneeSelector}>

        <div className={"iconfont"} style={{paddingLeft:"0.2rem",flexShrink:0,flexGrow:0,width:'1.2rem',fontSize:'0.6rem',color:'grey',boxSizing:'border-box'}}>&#xe609;</div>
        <div className={styles.assigneeName}>责任人</div>
        {
          ComponentUtils.isEmpty(staffList)?
            <div className={styles.assigneeRightLeft} onClick={this.handleShowStaffPane.bind(this)}><div style={{float:"right"}}>请选择</div></div>
            :<div className={styles.assigneeMain} onClick={this.handleShowStaffPane.bind(this)}>
              {
                staffList.map((item,index)=>(item.avatar?
                  <img  src={item.avatar} className={styles.assigneeStaffList} />
                  :<div key={index} className={styles.assigneeStaffList} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>{item.name.substring(item.name.length-2)}
                  </div>))
              }
              </div>
        }

        <div className={"iconfont"} style={{paddingLeft:"0.3rem",width:'1.2rem',boxSizing:'border-box',flexShrink:0,flexGrow:0}}>&#xe636;</div>

      </div>
    )
  }
}


export default AssigneeSelector;
