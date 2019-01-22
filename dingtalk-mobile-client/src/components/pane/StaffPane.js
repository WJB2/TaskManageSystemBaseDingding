import React,{PureComponent} from 'react';

import staffService from '../../services/system/StaffService';

import ComponentUtils from '../../utils/ComponentUtils';

import DingTalkUtils from '../../utils/DingTalkUtils';

import styles from './PaneIndex.less';

import { List,InputItem,Checkbox,SearchBar } from 'antd-mobile';

import HeaderHandler from '../main/HeaderHandler';

const CheckboxItem=Checkbox.CheckboxItem;

require("pinyin4js");

import _ from 'lodash';

class StaffPane extends PureComponent{

  state={
    values:null,//选择人
    staffList:[],//人员列表
    allchecked:false,//全选输入框是否选中
    checked:false,//选择框是否选中
    idArray:[],//选择的id数组
    searchText:null,//输入框
  }

  async componentWillMount(){//组件初

    if(!ComponentUtils.isEmpty(this.props.idArray) && this.props.idArray){
      this.setState({
        idArray:this.props.idArray
      })
    }
    const staffList=await staffService.findStaffList();

    staffList.forEach(item=>{
      item._pinyin = [PinyinHelper.getShortPinyin(item.name), PinyinHelper.convertToPinyinString(item.name, '',PinyinFormat.WITHOUT_TONE )];
    });

    this.setState({
      staffList:staffList,
    })

    const {onHandleCancel}=this.props;

    document.addEventListener('backbutton',async function(e){
      e.preventDefault();
      DingTalkUtils.closeBrower();
    })

  }

  handleSelect(item,e){//选择了哪些

    if(ComponentUtils.isEmpty(this.state.idArray) && e.target.checked){//如果没有人员被选择

      let idArrays=[];

      idArrays=ComponentUtils.getIdArray(item);//得到id数组

      this.setState({
        idArray:idArrays,
      })

    }

    if(!ComponentUtils.isEmpty(this.state.idArray) && e.target.checked ){//如果选择人员已选择

      let idArrays=[];

      idArrays=this.state.idArray.concat();

      idArrays.push(item.id);

      console.log(idArrays)

      this.setState({
        idArray:idArrays,
      })

    }

    if(!e.target.checked){//如果人愿意选择
      console.log('你正在移除人员')

      let idArrays=[];

      idArrays=this.state.idArray.concat();

      idArrays=ComponentUtils.removeItem(idArrays,item.id);

      this.setState({
        idArray:idArrays,
      })
    }
  }

  handleCancel(){//点击取消隐藏选择框
    const {onHandleCancel}=this.props;

    if(onHandleCancel){
      onHandleCancel()
    }

  }

  handSubmit(idArray){//点击确定提交Id数组
    const {onHandleSubmit}=this.props;

    if(onHandleSubmit){
      onHandleSubmit(idArray)
    }

  }

  filterOption(items,text){

    if(!text){
      return items;
    }

    console.log(items);
    console.log(text);

    text = text.toLowerCase();

    console.log(text);

    const freshList = items.filter(item=>{

      if(item.name.indexOf(text)>=0){
        return true;
      }

      for(let i=0; i<item._pinyin.length; i++){
        if(item._pinyin[i].indexOf(text)>=0){
          return true;
        }
      }

      return false;
    });

    console.log(freshList);

    return freshList;
  }

  render(){

    const {
      staffList,
      allchecked,
      checked,
      idArray,
    }=this.state;

    console.log(idArray)

    const toastMessage = idArray.length===0?'超出了':`已选择${idArray.length}人`

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'选人',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{this.props.onHandleCancel()}
    }


    return(
       <div className={styles.staffPane} >

           <HeaderHandler {...headerConfig}/>

           <div className={styles.staffPaneContent}>
             <div className={styles.staffPaneInput}>
                <SearchBar placeholder={"搜索"}
                  onFocus={(e)=>{this.setState({
                    searchText:"无名",
                  });window.page="two"}}
                  onChange={(value)=>{this.setState({
                    searchText:value,
                  })}}
                >
                  <div className="iconfont">&#xe62f;</div>
                </SearchBar>
            </div>
            <div className={styles.staffPaneText}>
              联系人
            </div>
            <div className={styles.staffPaneGrey}>
            </div>
            <div className={styles.staffPaneCheckbox}>
              <List>

                {
                  this.filterOption(staffList,this.state.searchText).map((item,index)=>{
                    return(
                      <CheckboxItem  key={index} checked={ComponentUtils.isInArray(idArray,item.id)}
                        onChange={(e)=>{
                          this.handleSelect(item,e)
                        }} >
                        {item.name}
                      </CheckboxItem>
                    )
                  })
                }
              </List>
            </div>
          </div>
         <div className={styles.staffPaneFooter}>
           <div>{toastMessage}</div>
           <div onClick={()=>{
             this.handSubmit(idArray)
           }}>确定{idArray.length}/1000</div>
         </div>
       </div>
    )
  }
}

export default StaffPane;
