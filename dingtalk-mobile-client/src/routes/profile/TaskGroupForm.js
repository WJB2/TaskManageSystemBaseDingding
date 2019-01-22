import React,{PureComponent} from 'react';
import tagColorEnum from "../../enum/TagColorEnum";
import HeaderHandler from "../../components/main/HeaderHandler";
import DingTalkUtils from '../../utils/DingTalkUtils';
import styles from './ProfileIndex.less';
import { createForm } from 'rc-form';
import {List,InputItem,Radio,Toast} from 'antd-mobile';
const RadioItem = Radio.RadioItem;

@createForm()
class TaskGroupForm extends PureComponent{

  state={
    value:'GREY',
  }

  handleSubmit(e){
    e.preventDefault();

    const { onSubmit,currentTaskGroup,taskGroupFormType} = this.props;

    this.props.form.validateFields((error,values)=>{

      if(!values.name){
        Toast.info('群组名称不能为空',1);
      }else{
        onSubmit({...values, id:currentTaskGroup&&currentTaskGroup.id?currentTaskGroup.id:null})
      }
    })
  }

  handleChangeRadio(color){
    this.setState({
      value:color
    })
  }

  render(){
    const { formType,currentTaskGroup,onDelete,onBack}=this.props;

    const taskGroup=currentTaskGroup?currentTaskGroup:'';

    const { getFieldDecorator,getFieldProps } = this.props.form;

    const colorArray=['GREY','GREEN','BLUE','YELLOW','RED'];

    const headerConfig={
      leftTitle:'退出',
      rightTitle:'返回',
      centerTitle:'我的群组',
      rightVisible:true,
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return (
      <div className={styles.tagadd}>

        <HeaderHandler {...headerConfig}/>

        <List>

          <InputItem placeholder={"请输入群组名称"} {...getFieldProps('name',{
            initialValue:taskGroup.name,
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
        {formType==='ADD' ? <div className={styles.tagsave}
                                        onClick={(e)=>{
                                          this.handleSubmit(e)
                                        }}>保存</div>:null}
        {formType==='EDIT'?<div className={styles.editbutton}>
          <div onClick={(e)=>{
            this.handleSubmit(e)
          }}>保存</div>
          <div onClick={()=>{
            onDelete(taskGroup)
          }}>删除</div>
        </div>:null}
      </div>
    )
  }
}

export default TaskGroupForm;
