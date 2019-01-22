import React,{PureComponent} from 'react';

import TagPane from '../pane/TagPane';

import { List,InputItem,Checkbox,SearchBar,Toast } from 'antd-mobile';

import styles from './TaskIndex.less';

import tagService from '../../services/tag/TagService';

import ComponentUtils from "../../utils/ComponentUtils";

const Item = List.Item;

class TagSelector extends PureComponent{

  state={
    paneVisible:false,//标签选择面板是否显示
    tagList:[],//选择后的人员列表
    values:[],//选择的id数组
    idArray:[],
  }

  async componentWillMount(){


    if(this.props.value){
      const tagList=await tagService.findTaskTagList({
        id:this.props.value
      })
      this.setState({
        tagList:tagList,
        idArray:this.props.value,
      })
    }
  }

  handleCancel(){//点击蒙层取消选择框
    this.setState({
      paneVisible:false,
    })
  }

  async handleSubmit(values){//点击完成提交array数组

    this.props.onChange(values);

    if(values && values.length>0){
      const tagList=await tagService.findTaskTagList({
        id:values,
      })
      this.setState({
        tagList:tagList,
        idArray:this.props.value,
      })
    }else{
      this.setState({
        tagList:[],
        idArray:[],
      })
    }

    this.setState({
      paneVisible:false,
    })

  }

  handleShowTagPane(){

    if(this.props.isChange){
      Toast.info('标签已不能再选择',1)
    }else{
      this.setState({
        paneVisible:true,
      })

    }
  }

  render(){
    const {
      value,//选中的数组
      isChange
    }=this.props;

    const {
      paneVisible,
      tagList,
      idArray
    }=this.state;

    const paneConfig={
      idArray:idArray,
      onHandleCancel:this.handleCancel.bind(this),
      onHandleSubmit:this.handleSubmit.bind(this),
    }

    return(
      <div className={styles.tagSelector}>
        <div className={"iconfont"} style={{width:'1.2rem',paddingLeft:'0.2rem',fontSize:'0.6rem',color:'grey',boxSizing:'border-box'}}>&#xe627;</div>
        <div className={styles.tagSelectorName}>标签</div>
        <div className={styles.tagSelectorMain}  onClick={()=>{this.handleShowTagPane()}}>
          {ComponentUtils.isEmpty(tagList)?<div className={styles.tagSelectorRight}><div className={styles.tagSelectorRightLeft}>请选择</div>
            <div className={"iconfont"}>&#xe636;</div></div>:<div className={styles.tagSelectorWrapper}>{
            tagList.map((item,index)=>(<div key={index} className={styles.tagSelectorList} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
              {item.name}
            </div>))
          }</div>}

        </div>

        {paneVisible && <TagPane {...paneConfig}/>}

      </div>
    )
  }
}

export default TagSelector;
