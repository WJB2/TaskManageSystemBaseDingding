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

import { DatePicker,TextareaItem,List } from 'antd-mobile';

import moment from "moment/moment";
import ComponentUtils from "../../utils/ComponentUtils";
import DingTalkUtils from "../../utils/DingTalkUtils";
import styles from './TaskIndex.less';

const Item=List.Item;

class TaskViewer extends PureComponent{

  state={
    beginTime:null,
    endTime:null,
  }

  componentWillMount(){

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

  render(){

    const { downloadFile,getFieldValue,getFieldDecorator,getFieldProps,task,onHandleClickView,onHandleIphoneBack,onBack }=this.props;

    const headerConfig={
      leftTitle:'退出',
      centerTitle:'任务详情',
      rightVisible:true,
      rightTitle:'返回',
      onQuit:()=>{DingTalkUtils.closeBrower()},
      onPop:()=>{onBack()}
    }

    return(
      <div>

        <HeaderHandler {...headerConfig}/>

        {getFieldDecorator('title',{
          initialValue:task.title?task.title:null,
        })(
          <TextareaCustom isChange={true}/>
        )}

        {getFieldDecorator('imageIdList',{
          initialValue:task.imageIdList?task.imageIdList:null,
        })(
          <ImageSelector isChange={true}/>
        )}

        {getFieldDecorator('taskType',{
          initialValue:task.taskType?task.taskType:null,
        })(
          <TaskTypeSelector isChange={true}/>
        )}

        {
          getFieldDecorator('progressStatus',{
            initialValue:task.progressStatus?task.progressStatus:null,
          })(
            <SliderSelector isChange={true}/>
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
                <div>{ComponentUtils.getDateFormat(new Date())}</div>:
                <div>{getFieldValue('endTime')}</div>
            }
          </div>
          <div className={"iconfont"}
               style={{paddingLeft:"0.3rem",width:'1.2rem',boxSizing:'border-box',flexShrink:0,flexGrow:0}}
               onClick={()=>{this.handleSelectTime('end')}}
          >&#xe636;</div>
        </div>

        {getFieldDecorator('assigneeIdList',{
          initialValue:task.assigneeIdList?task.assigneeIdList:null,
        })(
          <AssigneeSelector isChange={true} />
        )}

        {/*{getFieldDecorator('participatorIdList',{*/}
          {/*initialValue:task.participatorIdList?task.participatorIdList:null,*/}
        {/*})(*/}
          {/*<ParticipatorSelector isChange={true}/>*/}
        {/*)}*/}

        {getFieldDecorator('supervisorIdList',{
          initialValue:task.supervisorIdList?task.supervisorIdList:null,
        })(
          <SupervisorSelector isChange={true}/>
        )}


        {getFieldDecorator('projectId',{
          initialValue:task.projectId?task.projectId:null,
        })(
          <ProjectSelector isChange={true}/>
        )}


        {getFieldDecorator('attachmentIdList',{
          initialValue:task.attachmentIdList?task.attachmentIdList:null,
        })(
          <AttachmentSelector isChange={true} downloadFile={(id)=>{downloadFile(id)}}/>
        )}

        {getFieldDecorator('description',{
          initialValue:task.description?task.description:null,
        })(
          <DescriptionSelector isChange={true}/>
        )}

        <div className={styles.textcontent}>
        <TextareaItem
          {...getFieldProps('content',{
            initialValue:task.content?task.content:null,
          })}
          editable={false}
          rows={3}
          placeholder={"请输入任务内容"}
        ></TextareaItem>
        </div>

      </div>
    )
  }
}

export default TaskViewer;
