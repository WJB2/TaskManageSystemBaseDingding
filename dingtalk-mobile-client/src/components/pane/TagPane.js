import React,{ PureComponent } from 'react';

import tagService from '../../services/tag/TagService';

import styles from './PaneIndex.less';

import ComponentUtils from '../../utils/ComponentUtils';

import {List,Radio} from 'antd-mobile';

const RadioItem=Radio.RadioItem;

class TagPane extends PureComponent{

  state={
    systemtagList:[],//标签列表
    id:null,//标签的id
    idArray:[],
  }

  async componentWillMount(){

    console.log(this.props.idArray)

    if(!ComponentUtils.isEmpty(this.props.idArray)){
      this.setState({
        idArray:this.props.idArray,
      })
    }

    const systemtagList=await tagService.findTaskTagList({
      taskType:'SYSTEM',
    })

    this.setState({
      systemtagList:systemtagList,
    })

  }

  onChange(id){//选择多选框

    if(ComponentUtils.isEmpty(this.state.idArray)){

      let idArray=[];

      idArray=ComponentUtils.getIdArrayOfNumberOrString(id);

      this.setState({
        id:id,
        idArray:idArray,
      })

    }else if(!ComponentUtils.isEmpty(this.state.idArray) && !ComponentUtils.isInArray(this.state.idArray,id)){

      let idArray=new Array(...this.state.idArray)

      idArray.push(id);

      this.setState({
        idArray:idArray,
      })

    }else if(ComponentUtils.isInArray(this.state.idArray,id)){

      let idArray=new Array(...this.state.idArray)

      idArray=ComponentUtils.removeItem(idArray,id)

      this.setState({
        idArray:idArray,
      })
    }

  }

  handleSubmit(idArray){//点击完成提交id数组
    const {onHandleSubmit}=this.props;

    if(onHandleSubmit){
      onHandleSubmit(idArray)
    }
  }

  handleCancel(){
    const {onHandleCancel}=this.props;

    if(onHandleCancel){
      onHandleCancel()
    }

  }

  render(){

    const {

      systemtagList,
      id,
      idArray,

    }=this.state;

    return(
      <div className={styles.tagPane}>
        <div className={styles.tagPaneLeft} onClick={()=>{
          this.props.onHandleCancel()
        }}>»</div>
        <div className={styles.tagPaneRight}>
          <div className={styles.tagPaneSystem}>系统标签</div>
          <div className={styles.tagPaneList}>
            {
              systemtagList.filter((item,index)=>item.tagType==="SYSTEM").map((item,index)=>{
                return(
                  <RadioItem
                    key={index}
                    checked={ComponentUtils.isInArray(idArray,item.id)}
                    onClick={()=>{
                      this.onChange(item.id)
                    }}>
                    {item.name}
                  </RadioItem>
                )
              })
            }
          </div>
          <div className={styles.tagPaneSystem}>个人标签</div>
          <div className={styles.tagPaneList}>
            {
              systemtagList.filter((item,index)=>item.tagType==="STAFF").map((item,index)=>{
                return(
                  <RadioItem
                    key={index}
                    checked={ComponentUtils.isInArray(idArray,item.id)}
                    onClick={()=>{
                      this.onChange(item.id)
                    }}>
                    {item.name}
                  </RadioItem>
                )
              })
            }
          </div>
          <div className={styles.tagPaneSystem}>公司标签</div>

          <div className={styles.tagPaneButton} onClick={()=>{
            this.handleSubmit(idArray)
          }}>
           完成
          </div>
        </div>
      </div>
    )
  }
}

export default TagPane;


