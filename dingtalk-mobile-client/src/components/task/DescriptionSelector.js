import React,{PureComponent} from 'react';

import styles from './TaskIndex.less';

import TemplatePane from '../pane/TemplatePane';

import { List,InputItem,Checkbox,SearchBar } from 'antd-mobile';

import {Toast} from "antd-mobile/lib/index";

const Item = List.Item;

class DescriptionSelector extends PureComponent{

  state={
    paneVisible:false,
  }

  handleClick(){
    this.setState({
      paneVisible:true,
    })
  }

  handleSubmit(description){

    this.props.onChange(description);

    this.setState({
      paneVisible:false
    })

  }

  handleCli(){
    if(this.props.isChange){
      Toast.info('你不能选择描述',1)
    }else{
      this.setState({
        paneVisible:true,
      })
    }
  }

  render(){

    const {
      paneVisible
    }=this.state;

    const paneConfig={
      onHandleSubmit:this.handleSubmit.bind(this),
    }

    return(
       <div className={styles.templateSelector} onClick={()=>{this.handleCli()}}>
         <div className={"iconfont"} style={{fontSize:'0.6rem',color:'grey',position:'relative',top:'0.2rem',left:'0.2rem'}}>&#xe643;</div>
         <div className={styles.templateName}>任务内容</div>
         { paneVisible &&<TemplatePane {...paneConfig} />}
       </div>
    )
  }
}

export default DescriptionSelector;
