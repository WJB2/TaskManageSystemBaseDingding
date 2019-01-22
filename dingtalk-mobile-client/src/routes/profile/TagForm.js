import React,{PureComponent} from 'react';

import {List,InputItem,Radio,Toast} from 'antd-mobile';

import styles from './TagIndex.less';

import tagColorEnum from '../../enum/TagColorEnum';

import HeaderHandler from '../../components/main/HeaderHandler';

import DingTalkUtils from '../../utils/DingTalkUtils'

import {createForm} from 'rc-form';

const RadioItem = Radio.RadioItem;

@createForm()
class TagForm extends PureComponent{

  state={
    value:'GREY',
  }

  handleSubmit(e){
    e.preventDefault();

    const { onSubmit,currentTaskTag,taskTagFormType} = this.props;

    this.props.form.validateFields((error,values)=>{

      values.label=this.state.value;

      if(!values.name){
        Toast.info('标签名不能为空',1);
      }else{
        onSubmit({...values, id:currentTaskTag&&currentTaskTag.id?currentTaskTag.id:null})
      }
    })
  }

  handleChangeRadio(color){
    this.setState({
      value:color
    })
  }


  render(){

    const {onSubmit,staffComponentDefault,onChangeRadio,currentTaskTag,
      taskTagFormType,onDelete,onBack}=this.props;

    const taskTag=currentTaskTag || {};

    const { getFieldProps } = this.props.form;

    const colorArray=['GREY','GREEN','BLUE','YELLOW','RED'];

    const headerConfig={
      leftTitle:'退出',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(
      <div className={styles.tagadd}>

        <HeaderHandler {...headerConfig}/>

        <List>
          <InputItem placeholder={"请输入标签名称"} {...getFieldProps('name',{
            initialValue:taskTag.name,
          })}></InputItem>

          <div className={styles.taggreyline}></div>
          {
            colorArray.map((item,key)=>{
              return (
                <RadioItem key={key} checked={this.state.value==item}
                  onChange={(e)=>{
                    this.handleChangeRadio(item)
                  }}>
                  <div
                    className={styles.tagcolorball}
                    style={{backgroundColor:`${tagColorEnum.getDisplayColor(item)}`}}>
                  </div>
                  <span>{tagColorEnum.getDisplayText(item)}</span>
                </RadioItem>
              )
            })
          }
        </List>
        {taskTagFormType==='ADD' ? <div className={styles.tagsave}
          onClick={(e)=>{
            this.handleSubmit(e)
          }}>保存</div>:null}
        {taskTagFormType==='EDIT'?<div className={styles.editbutton}>
          <div onClick={(e)=>{
            this.handleSubmit(e)
          }}>保存</div>
          <div onClick={()=>{
            onDelete(taskTag)
          }}>删除</div>
        </div>:null}
      </div>
    )
  }
}

export default TagForm;
