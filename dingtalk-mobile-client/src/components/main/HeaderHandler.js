import React,{PureComponent} from 'react';
import DingTalkMobile from 'dingtalk-jsapi';

class HeaderHandler extends React.Component{

  render(){

    const { leftTitle,centerTitle,rightTitle,rightVisible,onPop=()=>{console.log('空')},onQuit }=this.props;

    DingTalkMobile.biz.navigation.setTitle({
      title:centerTitle,
      onSuccess:(res)=>{

      },
      onFail:(err)=>{console.log()}
    })

    DingTalkMobile.biz.navigation.setLeft({
      control:true,
      text:leftTitle,
      onSuccess:(msg)=>{onQuit()},
      onFail:(err)=>{console.log()}
    })

    DingTalkMobile.biz.navigation.setRight({
      show:rightVisible,
      control:true,
      text:rightTitle,
      onSuccess:(msg)=>{onPop()}
    })

    return null;
  }
}

export default HeaderHandler;
