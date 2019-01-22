import React,{PureComponent} from 'react';
import DingTalkMobile from 'dingtalk-jsapi';
import HeaderHandler from './../main/HeaderHandler';
import {connect} from 'dva';
import DingTalkUtils from "../../utils/DingTalkUtils";

@connect(models=>({
  globalModel:models['global'],
}))
class StaffPane extends PureComponent {

  componentWillMount(){
    const _this=this;
    document.addEventListener('backbutton', function(e) {
      // 在这里处理你的业务逻辑
      e.preventDefault(); //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现

    });
  }

  render(){

    const {globalModel,onDingStaffSubmit,onDingStaffCancel}=this.props;


    DingTalkMobile.biz.contact.complexPicker({
      title:'选人',
      corpId:globalModel.corpId,
      multiple:true,
      limitTips:"超出了",
      maxUsers:1000,
      permissionType:"GLOBAL",
      onSuccess: function(result) {
        console.log("选人成功");
        onDingStaffSubmit(result);
      },
      onFail : function(err) {console.log("w")}
    })

    return null;
  }
}

export default StaffPane;
