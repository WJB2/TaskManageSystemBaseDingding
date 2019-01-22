import React,{PureComponent} from 'react';

import styles from './PaneIndex.less';

import HeaderHandler from '../main/HeaderHandler';

import organizationService from '../../services/system/OrganizationService';

import DingTalkUtils from '../../utils/DingTalkUtils';

class _OrganizationPane extends PureComponent{

  componentWillMount(){
    this.setState({
      _organizationList:this.props.organizationList,//值不断变化
      _constOrganizationChildren:this.props.organizationList,//值不变
    })
  }

  state={
    _constOrganizationChildren:[],//首页的子信息(恒不变)
    _organizationList:[],//组织列表(变化)
    _lastOrganizationList:[],//点击时上一层信息
  }

  _handleClick(children,lastOrganizationList){
    this.setState({
      _organizationList:children,//当前的组织列表
      _lastOrganizationList:lastOrganizationList//当前列表上一表
    })
  }

  _handleCancel(){

    if(this.state._organizationList==this.state._constOrganizationChildren){

        const {_onHandleCancel}=this.props;

        if(_onHandleCancel){
          _onHandleCancel()
        }

    }else{
      this.setState({
        _organizationList:this.state._lastOrganizationList,
      })
    }
  }

  _handleSubmit(id){
    const {_onHandleSubmit}=this.props;
    if(_onHandleSubmit){
      _onHandleSubmit(id)
    }
  }

  render(){

    const {
      _organizationList,
    }=this.state;

    const headerConfig={
      leftTitle:'返回',
      centerTitle:'选部门',
      rightTitle:'',
      rightVisible:false,
      onPop:()=>{console.log()},
      onQuit:this._handleCancel.bind(this)
    }

    return(
      <div>
      <div className={styles._organizationPane}>

        <HeaderHandler {...headerConfig}/>

        <div className={styles._organizationPaneContent}>

          <div className={styles._organizationPaneText}>
            联系人
          </div>

          <div className={styles._organizationPaneGrey}></div>
          {_organizationList?<div className={styles._organizationPaneList}>
            {
              _organizationList.map((item,index)=>{
                return <div key={index} className={styles._organizationPaneSection}>
                  <span  onClick={()=>{
                    this._handleSubmit(item.id)
                  }}>{item.name}</span>
                  <div className={styles._organizationPaneInsection}
                    onClick={()=>{
                      this._handleClick(item.children,_organizationList)
                    }}>
                    <div className={"iconfont"}>&#xe9dd;</div>下级
                  </div>
                </div>
              })
            }
          </div>:<div className={styles._blankOrganizationPane}>
            <div className={"iconfont"}>&#xe64d;</div>
          </div>}
        </div>
      </div>
      </div>
    )
  }
}

class OrganizationPane extends PureComponent{

  state={
    organizationList:[],//组织列表
    paneVisible:false,//面板是否可
    organizationChildrenList:[]
  }

  async componentWillMount(){//初始化

    const organizationList=await organizationService.findOrganizationTree();

    this.setState({
      organizationList:organizationList,
    })

    document.addEventListener('backbutton',function(e){
      e.preventDefault();
      DingTalkUtils.closeBrower();
    })

  }

  handleCancel(){
    const {onHandleCancel}=this.props;

    if(onHandleCancel){
      onHandleCancel()
    }
  }

  handleSubmit(id) {
    const {onHandleSubmit} = this.props;

    if(onHandleSubmit){
      onHandleSubmit(id)
    }
  }

  handleClick(children){//点击
    console.log('我点击了下级')
      this.setState({
        paneVisible:true,
        organizationChildrenList:children,
      })

  }

  _handleCancel(){
    this.setState({
      paneVisible:false,
    })
  }

  render(){

    const {
      organizationList,
      paneVisible,
      organizationChildrenList
    }=this.state;

    console.log(paneVisible)

    const {
      onHandleCancel
    }=this.props;

    const paneConfig={
      organizationList:organizationChildrenList,
      _onHandleCancel:this._handleCancel.bind(this),
      _onHandleSubmit:this.handleSubmit.bind(this)
    }

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'选部门',
      rightTitle:'返回',
      rightVisible:true,
      onPop:()=>{this.props.onHandleCancel()},
      onQuit:()=>{DingTalkUtils.closeBrower()}
    }


    return(
      <div>

        <HeaderHandler {...headerConfig}/>

        <div className={styles.organizationPane}>

          <div className={styles.organizationPaneContent}>
            <div className={styles.organizationPaneText}>
              联系人
            </div>
            <div className={styles.organizationPaneGrey}></div>
            <div className={styles.organizationPaneList}>
              {
                organizationList.map((item,index)=>{
                  return <div key={index} className={styles.organizationPaneSection}
                              onClick={()=>{
                                this.handleSubmit(item.id)
                              }}>
                    <div className={styles.organization}>{item.name}</div>
                    <div className={styles.organizationPaneInsection}
                      onClick={()=>{
                        this.handleClick(item.children)
                      }}>
                      <div className={"iconfont"}>&#xe9dd;</div>
                      <div>下级</div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        {paneVisible && <_OrganizationPane {...paneConfig}/>}
      </div>
    )
  }
}

export default OrganizationPane;
