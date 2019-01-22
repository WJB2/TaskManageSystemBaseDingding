import React,{PureComponent} from 'react';

import HeaderHandler from '../../components/main/HeaderHandler';

import styles from './ProjectIndex.less';

import ImagePane from '../../components/pane/ImagePane';

import fileService from './../../services/system/FileService';

import ButtonComponent from '../../components/main/ButtonHandler';

import {Toast} from "antd-mobile/lib/index";

class ProjectDetailAccess extends PureComponent{

  handleClick(){
    if(this.props.isChange){
      Toast.info('你不能点',1)
    }else{
      this.setState({
        paneVisible:true,
      })
    }
  }

  state={
    paneVisible:false,
    imageAccept:'image/*'
  }

  render(){

    const {currentProject,onBack}=this.props;


    const {
      paneVisible,
      imageAccept,
      handleAgent
    }=this.state;


    const buttonConfig={
      uniqueLabel:'icon-shangchuan',
      color:'#FFA122',
      zIndex:11
    }

    const headerConfig={
      leftTitle:'退出',
      centerTitle: currentProject.name,
      rightTitle:"更多",
      rightVisible:true,
      onPop:()=>{console.log('1')}
    }

    const fileConfig={
      imageAccept:imageAccept,
      onHandleClick:this.handleClick.bind(this),
      onHandleAgent:(filesId)=>{handleAgent(filesId)},
      // onHandleSelectedFiles:this.handleSelectedFiles.bind(this),
    }

    return(
      <div className={styles.projectDetailAccess}>

        {/*<Header {...headerConfig}/>*/}

        {/*<div className={styles.maincirclea}*/}
             {/*style={{backgroundColor:'#FFA122',boxShadow:'#FFA122 0px 0px 10px'}}*/}
             {/*onClick={()=>{*/}
               {/*this.handleClick();*/}
             {/*}}>*/}
          {/*<div style={{fontSize:'0.5rem',color:'#FFFFFF'}} className={`iconfont icon-shangchuan`}></div>*/}
        {/*</div>*/}

        {/*{paneVisible && <FilePane {...fileConfig}/>}*/}
        <div onClick={()=>onBack()} className={styles.backButton}>返回</div>

      </div>
    )
  }
}

export default ProjectDetailAccess;
