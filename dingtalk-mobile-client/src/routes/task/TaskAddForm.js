import React,{PureComponent} from 'react';

import HeaderHandler from '../../components/main/HeaderHandler';

import TextareaCustom from '../../components/task/TextareaCustom';
import ImageSelector from '../../components/task/ImageSelector';
import TagSelector from '../../components/task/TagSelector';
import SliderSelector from '../../components/task/SliderSelector';
import AssigneeSelector from '../../components/task/AssigneeSelector';
import ParticipatorSelector from '../../components/task/ParticipatorSelector';
import SupervisorSelector from '../../components/task/SupervisorStaffSelector';
import ProjectSelector from '../../components/task/ProjectSelector';
import AttachmentSelector from '../../components/task/AttachmentSelector';
import DescriptionSelector from '../../components/task/DescriptionSelector';
import TaskTypeSelector from '../../components/task/TaskTypeSelector';
import ProjectService from '../../services/project/ProjectService';

import styles from './TaskIndex.less';

import { DatePicker,TextareaItem,List } from 'antd-mobile';

import moment from "moment/moment";
import ComponentUtils from "../../utils/ComponentUtils";
import DingTalkUtils from "../../utils/DingTalkUtils";

import DingTalkMobile from 'dingtalk-jsapi';

const Item=List.Item;

class TaskAddForm extends PureComponent{

  state={
    beginTime:null,
    endTime:null,
  }

  handleSelectTime(label){

    const _this=this;

    DingTalkMobile.biz.util.datepicker({
       format:'yyyy-MM-dd',
       value:label==="begin"?ComponentUtils.getDateFormat(new Date()):ComponentUtils.getDateFormat(new Date(new Date().getTime() + 24*60*60*1000)),
       onSuccess:function(result){
         _this.props.setFieldsValue({
           [label+'Time']:result.value,
         })
       },
       onFail:function(e){
         console.log(e);
       }
    })
  }

  async onProjectChange(values){
    const projectDetail=await ProjectService.findProjectById({id:values});
    console.log(projectDetail);
    this.props.setFieldsValue({
      assigneeIdList:projectDetail.assigneeIdList,
      supervisorIdList:projectDetail.supervisorIdList
    })
  }

  render(){

    console.log("我进入了增加");

    const {task,getFieldsValue,globalModel,getFieldDecorator,getFieldProps,onHandleChangeType,onBack,handleAugmentChange,getFieldValue}=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'创建任务',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(

      <div>

        <HeaderHandler {...headerConfig}/>

        {getFieldDecorator('title')(
          <TextareaCustom />
        )}

        {getFieldDecorator('imageIdList')(
          <ImageSelector />
        )}

        {getFieldDecorator('taskType',{
          initialValue:"NORMAL"
        })(
          <TaskTypeSelector />
        )}

        {
          getFieldDecorator('progressStatus')(
            <SliderSelector/>
          )
        }

        <div className={styles.pickerstaffindex_task} {...getFieldProps('beginTime')} >
          <div className={"iconfont"} style={{width:'1.2rem',paddingLeft:'0.2rem',fontSize:'0.6rem',color:'grey',boxSizing:'border-box'}}>&#xe645;</div>
          <div className={styles.pickername} >开始时间</div>
          <div className={styles.pickermain} onClick={()=>{this.handleSelectTime('begin')}}>
            {
              getFieldValue('beginTime')===undefined?
                <div>{ComponentUtils.getDateFormat(new Date())}</div>:
                <div>{getFieldValue('beginTime')}</div>
            }
          </div>
          <div className={"iconfont"}
               style={{paddingLeft:"0.3rem",width:'1.2rem',boxSizing:'border-box',flexShrink:0,flexGrow:0}}
               onClick={()=>{this.handleSelectTime('begin')}}
          >&#xe636;</div>
        </div>

        <div className={styles.pickerstaffindex_task} {...getFieldProps('endTime')} >
          <div className={"iconfont"} style={{width:'1.2rem',paddingLeft:'0.2rem',fontSize:'0.6rem',color:'grey',boxSizing:'border-box'}}>&#xe646;</div>
          <div className={styles.pickername} >结束时间</div>
          <div className={styles.pickermain} onClick={()=>{this.handleSelectTime('end')}}>
            {
              getFieldValue('endTime')===undefined?
                <div>{ComponentUtils.getDateFormat(new Date(new Date().getTime() + 24*60*60*1000))}</div>:
                <div>{getFieldValue('endTime')}</div>
            }
          </div>
          <div className={"iconfont"}
               style={{paddingLeft:"0.3rem",width:'1.2rem',boxSizing:'border-box',flexShrink:0,flexGrow:0}}
               onClick={()=>{this.handleSelectTime('end')}}
          >&#xe636;</div>
        </div>

        {getFieldDecorator('assigneeIdList')(
          <AssigneeSelector globalModel={globalModel}  />
        )}

        {/*{!task.parentId?getFieldDecorator('participatorIdList')(*/}
          {/*<ParticipatorSelector globalModel={globalModel}   />*/}
        {/*):null}*/}

        {getFieldDecorator('supervisorIdList')(
          <SupervisorSelector globalModel={globalModel}/>
        )}

        {getFieldDecorator('projectId')(
          <ProjectSelector onChange={this.onProjectChange.bind(this)}/>
        )}


        {getFieldDecorator('attachmentIdList')(
          <AttachmentSelector />
        )}

        {getFieldDecorator('description')(
          <DescriptionSelector />
        )}

        <div className={styles.textcontent}>
        <TextareaItem
          {...getFieldProps('content')}
          rows={3}
          placeholder={"请输入任务内容"}
        ></TextareaItem>
        </div>

      </div>
    )
  }
}

export default TaskAddForm;
