import React,{PureComponent} from 'react';

import styles from './PaneIndex.less';

import HeaderHandler from '../main/HeaderHandler';

import { List,Checkbox,WhiteSpace } from 'antd-mobile';

import ComponentUtils from '../../utils/ComponentUtils';

import DingTalkUtils from '../../utils/DingTalkUtils';

const CheckboxItem =Checkbox.CheckboxItem;

class FilterPane extends React.Component{

  state={
    values:null,//value数组
  }

  componentWillMount(){

    document.addEventListener('backbutton',function(e){
      e.preventDefault();
      DingTalkUtils.closeBrower()
    })

      if(this.props.values){
        this.setState({
          values:this.props.values
        })
      }

  }

  handleChangeCheckBox(item){

    if(this.state.values.includes(item)){//当点击包含数组

      let valuesArray=this.state.values;

      let array=ComponentUtils.removeItem(valuesArray,item)

      this.setState({
        values:array
      })

    }else{
      let valuesArray=this.state.values;

      valuesArray.push(item)

      this.setState({
        values:valuesArray
      })

    }

  }

  render(){

    const { values }=this.state;

    const { onSubmit,onBack }=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'设置筛选项',
      rightVisible:true,
      rightTitle:'返回',
      onPop:()=>{onBack()},
      onQuit:()=>{DingTalkUtils.closeBrower()},
    }

    const filterData=['开始时间',"截止时间","选择创建人","选择责任人","选择关注人","标签","群组","项目","显示onQuit"];

    return(
      <div className={styles.filterPane}>

        <HeaderHandler {...headerConfig}></HeaderHandler>

        <List>
          {
            filterData.map((item,index)=>(
              <CheckboxItem checked={values.includes(item)} onChange={()=>{this.handleChangeCheckBox(item)}} key={index}>
                {item}
              </CheckboxItem>
            ))
          }
        </List>


          <div style={{height:'1rem',width:'90%',backgroundColor:'#5B88CB',margin:'0.5rem auto',lineHeight:'1rem',
          borderRadius:'5px',textAlign:'center',color:'#fff',
          boxSizing:'border-box'}} onClick={()=>{onSubmit(values)}}>保存</div>

      </div>
    )
  }

}

export default FilterPane;
