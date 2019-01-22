import React,{PureComponent} from 'react';

import {List,Radio,DatePicker} from 'antd-mobile';

import StaffPane from '../../components/pane/StaffPane';
import TagPane from '../../components/pane/TagPane';
import GroupPane from '../../components/pane/GroupPane';
import ProjectPane from '../../components/pane/ProjectPane';

import styles from './TaskIndex.less';

import staffService from "../../services/system/StaffService";
import tagService from "../../services/tag/TagService";
import groupService from "../../services/task/TaskGroupService";
import projectService from "../../services/project/ProjectService";

import ComponentUtils from "../../utils/ComponentUtils";
const RadioItem =Radio.RadioItem;

class TaskMenu extends React.Component{

  state={
    commonStyle:{color:'#7FA9E5'},//菜单的样式
    currentSonFilter:'是',//默认选择子任务
    date:new Date(),
    create:'不限',
    createVisible:false,
    createStaffList:[],
    createIdArray:[],
    assignee:'不限',
    assigneeVisible:false,
    assigneeStaffList:[],
    assigneeIdArray:[],
    superv:'不限',
    supervVisible:false,
    supervStaffList:[],
    supervIdArray:[],
    tag:'不限',
    tagVisible:false,
    tagStaffList:[],
    tagIdArray:[],
    group:'不限',
    groupVisible:false,
    groupStaffList:[],
    groupIdArray:[],
    project:'不限',
    projectVisible:false,
    projectStaffList:[],
    projectId:null,
  }

  constructor(props){
    super(props);
    this.myref=React.createRef();
  }

  componentDidMount(){


    this.setState({
      timeExtra:this.refs.time,
    })
  }

  handleClickMenu(currentName,whose){

    this.setState({
      commonStyle:{color:'#7FA9E5'},
      [whose+'CurrentName']:currentName,
      [whose+'IsClick']:true
    })
  }

  handleClickList(name,whose){
    this.setState({
      [whose+'CurrentName']:name,
      [whose+'IsClick']:false,
      commonStyle:{}
    })
  }

  handleClickMask(){
    this.setState({
      aboutMeIsClick:false,
      taskStatusIsClick:false,
      taskTimeIsClick:false,
    })
  }

  handleClick(item,whose){

    const {createVisible,assigneeVisible,supervVisible}=this.state;

    const clickFlag=whose+"Visible";

    if(item==="请选择"){
      this.setState({
        [clickFlag]:!(this.state[clickFlag])
      })
    }
    this.setState({
      [whose]:item,
    })
  }

  async handleStaffSubmit(values){//选创建人组件提交

    this.setState({
      createVisible:false,
    })

    this.props.onParamsChange({
      createdById:values,
    })

    if(!ComponentUtils.isEmpty(values)){
      const createStaffList=await staffService.findStaffList({
        id:values,
      })
      this.setState({
        createStaffList:createStaffList,
      })
    }else if(ComponentUtils.isEmpty(values)){
      const createStaffList=[];
      this.setState({
        createStaffList:createStaffList,
        create:'不限'
      })
    }

    this.setState({
      createIdArray:values,
    })

  }

  handleStaffCancel(){
    this.setState({
      createVisible:false,
      create:'不限'
    })
  }

  async handleAssigneeStaffSubmit(values){//选责任人组件提交

    this.setState({
      assigneeVisible:false,
    })

    this.props.onParamsChange({
      assigneeId:values,
    })

    if(!ComponentUtils.isEmpty(values)){
      const assigneeStaffList=await staffService.findStaffList({
        id:values,
      });
      this.setState({
        assigneeStaffList:assigneeStaffList
      })
    }else if(ComponentUtils.isEmpty(values)){
      const createStaffList=[];
      this.setState({
        assigneeStaffList:createStaffList,
        assignee:'不限'
      })
    }
    this.setState({
      assigneeIdArray:values,
    })

  }

  handleAssigneeStaffCancel(){
    this.setState({
      assigneeVisible:false,
      assignee:'不限'
    })
  }

  async handleSuperStaffSubmit(values){//选责任人组件提交

    this.setState({
      supervVisible:false,
    })

    this.props.onParamsChange({
      supervisorId:values,
    })

    if(!ComponentUtils.isEmpty(values)){
      const supervStaffList=await staffService.findStaffList({
        id:values,
      })

      this.setState({
        supervStaffList:supervStaffList,
      })
    }else if(ComponentUtils.isEmpty(values)){
      const supervStaffList=[];
      this.setState({
        supervStaffList:supervStaffList,
        superv:'不限'
      })
    }


    this.setState({
      supervIdArray:values,
    })

  }

  handleSuperStaffCancel(){
    this.setState({
      supervVisible:false,
      superv:'不限'
    })
  }

  async handleTagStaffSubmit(values){//选责任人组件提交

    this.setState({
      tagVisible:false,
    })

    this.props.onParamsChange({
      tagId:values,
    })


    if(ComponentUtils.isEmpty(values)){
      this.setState({
        tagStaffList:[],
        tag:'不限'
      })
    }else{

      const tagStaffList=await tagService.findTaskTagList({
        id:values,
      })


      this.setState({
        tagStaffList:tagStaffList,
      })

    }


    this.setState({
      tagIdArray:values,
    })

  }

  handleTagCancel(){
    this.setState({
      tagVisible:false,
      tag:'不限'
    })
  }

  async handleGroupStaffSubmit(values){//选责任人组件提交

    this.setState({
      groupVisible:false,
    })

    this.props.onParamsChange({
      groupId:values,
    })

    if(ComponentUtils.isEmpty(values)){
      this.setState({
        groupStaffList:[],
        group:'不限'
      })
    }else{

      const groupStaffList=await groupService.findTaskGroupList({
        id:values,
      });

      this.setState({
        groupStaffList:groupStaffList,

      })

    }


    this.setState({
      groupIdArray:values,
    })

  }

  handleGroupCancel(){
    this.setState({
      groupVisible:false,
      group:'不限'
    })
  }

  async handleProjectStaffSubmit(values){//选责任人组件提交

    this.setState({
      projectVisible:false,
    })

    this.props.onParamsChange({
      projectId:values,
    })

    if(ComponentUtils.isEmpty(values)){
      this.setState({
        projectStaffList:[],
        project:'不限'
      })
    }else{

      const projectStaffList=await projectService.findProjectById({
        id:values,
      })


      this.setState({
        projectStaffList:projectStaffList,
      })

    }


    this.setState({
      projectId:values,
    })

  }

  handleProjectCancel(){
    this.setState({
      projectVisible:false,
      project:'不限'
    })
  }

  render(){

    const {
      commonStyle,
      create,
      createVisible,
      createStaffList,
      assignee,
      assigneeVisible,
      assigneeStaffList,
      superv,
      supervVisible,
      supervStaffList,
      tag,
      tagVisible,
      tagStaffList,
      group,
      groupVisible,
      groupStaffList,
      project,
      projectVisible,
      projectStaffList,
    }=this.state;

    const {
      aboutMeCurrentName,//当前关于我的菜单显示哪一项
      taskStatusCurrentName,//当前任务状态
      taskTimeCurrentName,//当前任务的筛选
      aboutMeIsClick,//关于我的菜单是否被点击
      taskStatusIsClick,//当前状态菜单是否被点击
      taskTimeIsClick,//任务时间菜单是否被点击
      taskFilterIsClick,//筛选菜单是否显示

      currentClickFilter,//当前选择的筛选项

      whetherSubTask,//是否显示子任务

      onHeader,//点击菜单项
      onItem,//单击菜单详细项
      onSearch,//点击菜单项触发过滤条件
      onSearchIcon,//点击搜索图标
      onFilterAction,
      onReset,//点击重置
      onFilterItem,//点击筛选项
      onSelectSub,//点击是否显示子任务
      onCompleted,

      params,
      onParamsChange,//改变参数
      queryConditions,//筛选项
      onQueryConditionsChange,
      onFindTask,
      onHandleClickMask,
      handleCompletedFilter,
      onIcon,

    }=this.props;

    const aboutMeData=[
      {name:'我发起的',type:'OWNER'},
      {name:'我负责的',type:'ASSIGNEE'},
      {name:'我关注的',type:'SUPERVISOR'},
      {name:'我参与的',type:'PARTICIPATOR'},
      {name:'我审核的',type:'AUDITOR'}
    ];

    const taskStatusData=[
      {name:'全部',type:'ALL'},
      {name:'未完成的',type:'INCOMPLETE',
        children:[{name:'已过期的',type:'EXPIRED'},{name:'进行中的',type:'ONGOING'},{name:'未开始的',type:'READY'}]},
      {name:'无法完成的',type:'UNREACHABLE'},
      {name:'已完成的',type:'COMPLETED'},
    ];

    const taskTimeData=[
      {name:'创建时间(降序)',type:'CREATED_TIME_DESC'},
      {name:'创建时间(升序)',type:'CREATED_TIME_ASC'},
      {name:'截止时间(降序)',type:'END_TIME_DESC'},
      {name:'截止时间(升序)',type:'END_TIME_ASC'},
      {name:'结束时间(降序)',type:'BEGIN_TIME_DESC'},
      {name:'结束时间(升序)',type:'BEGIN_TIME_ASC'},
    ];

    const children=taskStatusData.map((item,index)=>{
      if(item.children){
         item.children.map((item,index)=>{
           return item.name
         })
      }
    })

    const sonTask=[{name:'是',value:true},{name:'否',value:false}];

    const endTimePicker=['截止时间'];

    const startTimePicker=['开始时间'];

    const selectPicker=['不限','请选择'];

    return(
      <div className={styles.taskMenu}>

        <div className={styles.taskMenuHeader}>
          <div style={aboutMeIsClick?commonStyle:{}} onClick={()=>{onHeader('aboutMe')}}>{aboutMeCurrentName}</div>
          <div style={taskStatusIsClick?commonStyle:{}} onClick={()=>{onHeader('taskStatus')}}>{taskStatusCurrentName}</div>
          <div style={taskTimeIsClick?commonStyle:{}} onClick={()=>{onHeader('taskTime')}}>{taskTimeCurrentName}</div>
          {/*<div style={{flexGrow:'1.5'}} className={"iconfont"} >&#xe633;</div>*/}
          <div className={"iconfont"} onClick={()=>{onSearchIcon()}}>&#xe633;</div>
          <div style={{flexGrow:'1',color:'orange'}} onClick={()=>{onHeader('taskFilter')}} className={"iconfont"}>&#xe64e;</div>
        </div>

        {aboutMeIsClick?<div className={styles.taskAboutMeBody} >{
          aboutMeData.map((item,index)=>(
            <div key={index} className={styles.taskAboutMeItem} style={aboutMeCurrentName===item.name?{color:'#7FA9E5'}:null} onClick={()=>{onItem(item.name,'aboutMe');onSearch({queryType:item.type})}} >
              {item.name}
              {aboutMeCurrentName===item.name?<span className={"iconfont"}>&#xe6ba;</span>:null}
            </div>
          ))
        }
        </div>:null
        }

        {taskStatusIsClick?<div className={styles.taskStatusBody} style={taskStatusIsClick?{maxHeight:'500px'}:{maxHeight:'0'}}>
          {
            taskStatusData.map((item,index)=>(
              <div key={index} className={styles.taskStatusItem} style={taskStatusCurrentName===item.name?{color:'#7FA9E5'}:null} onClick={()=>{onItem(item.name,'taskStatus');onSearch({status:item.type})}}>
                {item.name}
                {taskStatusCurrentName===item.name?<span className={"iconfont"}>&#xe6ba;</span>:null}
              </div>
            ))
          }
        </div>:null
        }

        {taskTimeIsClick?<div className={styles.taskTimeBody} style={taskTimeIsClick?{maxHeight:'500px',height:'6rem'}:{maxHeight:'0',height:'6rem'}} >
          {
            taskTimeData.map((item,index)=>(
              <div key={index} className={styles.taskTimeItem} style={taskTimeCurrentName===item.name?{color:'#7FA9E5'}:null} onClick={()=>{onItem(item.name,'taskTime');onSearch({sortBy:item.type})}}>
                {item.name}
                {taskTimeCurrentName===item.name?<span className={"iconfont"}>&#xe6ba;</span>:null}
              </div>
            ))
          }
        </div>:null
        }

        {taskFilterIsClick?<div className={styles.taskFilter}>

          <div className={styles.filterItemWrapper}>
                <div className={styles.taskFilterItem}>
                {queryConditions.map((item,index)=>(
                <div
                  key={index}
                  className={styles.taskFilterSingle}
                  style={{color:(item==="显示子任务"?'orange':''),backgroundColor:(currentClickFilter===item?'#fff':'')}}
                  onClick={()=>{onFilterItem(item)}}>{item}</div>
                ))}
                </div>
          </div>

          <div className={styles.taskFilterfield}>

                {
                  currentClickFilter==="显示子任务"?<div className={styles.taskFilterSub}>
                      {
                        sonTask.map((item,index)=>(
                          <div key={index} className={styles.subItem} onClick={()=>{onSelectSub(item.name);onParamsChange({includeSubTask:item.value})}}>{item.name}
                            {whetherSubTask===item.name?<div className={"iconfont"}>&#xe6ba;</div>:null}
                          </div>
                        ))
                      }
                  </div>:null
                }

                {
                  currentClickFilter==="截止时间"?endTimePicker.map((item,index)=>(
                    <DatePicker
                      mode={"date"}
                      title={`请选择截止时间`}
                      onOk={(e)=>{onParamsChange({endTime:ComponentUtils.getDateFormat(e)})}}
                    >
                      <div className={styles.timepicker} ref={this.myref}>
                        <div className={styles.timepickerson1}>{item}</div>
                        <div className={styles.timepickerson2}>{params.endTime?params.endTime:null}</div>
                      </div>
                    </DatePicker>
                  )):null
                }

                {
                  currentClickFilter==="开始时间"?startTimePicker.map((item,index)=>(
                    <DatePicker
                      mode={"date"}
                      title={`请选择开始时间`}
                      onOk={(e)=>{onParamsChange({startTime:ComponentUtils.getDateFormat(e)})}}
                    >
                      <div className={styles.timepicker} ref={this.myref}>
                      <div className={styles.timepickerson1}>{item}</div>
                      <div className={styles.timepickerson2}>{params.startTime?params.startTime:null}</div>
                    </div>
                    </DatePicker>
                  )):null
                }

                {
                  currentClickFilter==="选择创建人"?<div className={styles.selectpeople}>
                    {this.state.createVisible && <StaffPane idArray={this.state.createIdArray} onHandleSubmit={this.handleStaffSubmit.bind(this)} onHandleCancel={this.handleStaffCancel.bind(this)} />}
                    <div className={styles.seee} onClick={()=>{this.handleClick("不限","create")}}>
                      <div>不限</div>
                      {create==="不限"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                    </div>
                      {
                        ComponentUtils.isEmpty(this.state.createStaffList)?<div className={styles.seee} onClick={()=>{this.handleClick("请选择","create")}}>
                          <div>请选择</div>
                          {create==="请选择"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                        </div>:<div className={styles.seeeflex} onClick={()=>{this.handleClick("请选择","create")}}>
                          <div className={styles.wrapper}>
                          {
                            createStaffList.map((item,index)=>(
                              <div className={styles.circle} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                                {item.name.substring(item.name.length-2)}
                              </div>
                            ))
                          }
                          </div>
                        </div>
                      }
                  </div>:null
                }

                {
                  currentClickFilter==="选择责任人"?<div className={styles.selectpeople}>
                    {this.state.assigneeVisible && <StaffPane idArray={this.state.assigneeIdArray} onHandleSubmit={this.handleAssigneeStaffSubmit.bind(this)} onHandleCancel={this.handleAssigneeStaffCancel.bind(this)}/>}
                    <div className={styles.seee} onClick={()=>{this.handleClick("不限","assignee")}}>
                      <div>不限</div>
                      {assignee==="不限"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                    </div>
                    {
                      ComponentUtils.isEmpty(this.state.assigneeStaffList)?<div className={styles.seee} onClick={()=>{this.handleClick("请选择","assignee")}}>
                        <div>请选择</div>
                        {assignee==="请选择"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                      </div>:<div className={styles.seeeflex} onClick={()=>{this.handleClick("请选择","assignee")}}>
                        <div className={styles.wrapper}>
                          {
                            assigneeStaffList.map((item,index)=>(
                              <div className={styles.circle} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                                {item.name.substring(item.name.length-2)}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    }
                  </div>:null
                }

                {
                  currentClickFilter==="选择关注人"?<div className={styles.selectpeople}>
                    {this.state.supervVisible && <StaffPane idArray={this.state.supervIdArray} onHandleCancel={this.handleSuperStaffCancel.bind(this)} onHandleSubmit={this.handleSuperStaffSubmit.bind(this)} />}
                    <div className={styles.seee} onClick={()=>{this.handleClick("不限","superv")}}>
                      <div>不限</div>
                      {superv==="不限"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                    </div>
                    {
                      ComponentUtils.isEmpty(this.state.supervStaffList)?<div className={styles.seee} onClick={()=>{this.handleClick("请选择","superv")}}>
                        <div>请选择</div>
                        {superv==="请选择"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                      </div>:<div className={styles.seeeflex} onClick={()=>{this.handleClick("请选择","superv")}}>
                        <div className={styles.wrapper}>
                          {
                            supervStaffList.map((item,index)=>(
                              <div className={styles.circle} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                                {item.name.substring(item.name.length-2)}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    }
                  </div>:null
                }

                {
                  currentClickFilter==="标签"?<div className={styles.selecttag}>
                    {this.state.tagVisible && <TagPane idArray={this.state.tagIdArray} onHandleSubmit={this.handleTagStaffSubmit.bind(this)} onHandleCancel={this.handleTagCancel.bind(this)} />}
                    <div className={styles.seee} onClick={()=>{this.handleClick("不限","tag")}}>
                      <div>不限</div>
                      {tag==="不限"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                    </div>
                    {
                      ComponentUtils.isEmpty(this.state.tagStaffList)?<div className={styles.seee} onClick={()=>{this.handleClick("请选择","tag")}}>
                        <div>请选择</div>
                        {tag==="请选择"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                      </div>:<div className={styles.seeeflex} onClick={()=>{this.handleClick("请选择","tag")}}>
                        <div className={styles.wrapper}>
                          {
                            tagStaffList.map((item,index)=>(
                              <div className={styles.circle} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                                {item.name}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    }
                  </div>:null
                }

                {
                  currentClickFilter==="群组"?<div className={styles.selectgroup}>
                    {this.state.groupVisible && <GroupPane idArray={this.state.groupIdArray} onHandleSubmit={this.handleGroupStaffSubmit.bind(this)} onHandleCancel={this.handleGroupCancel.bind(this)}/>}
                    <div className={styles.seee} onClick={()=>{this.handleClick("不限","group")}}>
                      <div>不限</div>
                      {group==="不限"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                    </div>
                    {
                      ComponentUtils.isEmpty(this.state.groupStaffList)?<div className={styles.seee} onClick={()=>{this.handleClick("请选择","group")}}>
                        <div>请选择</div>
                        {group==="请选择"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                      </div>:<div className={styles.seeeflex} onClick={()=>{this.handleClick("请选择","group")}}>
                        <div className={styles.wrapper}>
                          {
                            groupStaffList.map((item,index)=>(
                              <div className={styles.circle} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                                {item.name}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    }
                  </div>:null
                }

                {
                  currentClickFilter==="项目"?<div className={styles.selectproject}>
                    {this.state.projectVisible && <ProjectPane projectId={this.state.projectId} onHandleSubmit={this.handleProjectStaffSubmit.bind(this)} onHandleCancel={this.handleProjectCancel.bind(this)}/>}
                    <div className={styles.seee} onClick={()=>{this.handleClick("不限","project")}}>
                      <div>不限</div>
                      {project==="不限"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                    </div>
                    {
                      ComponentUtils.isEmpty(this.state.projectStaffList)?<div className={styles.seee} onClick={()=>{this.handleClick("请选择","project")}}>
                        <div>请选择</div>
                        {project==="请选择"?<div className={"iconfont"}>&#xe6ba;</div>:null}
                      </div>:<div className={styles.seeeflex} onClick={()=>{this.handleClick("请选择","project")}}>
                        <div className={styles.wrapper}>
                              <div className={styles.circle} style={{backgroundColor:`${ComponentUtils.getRandomColor()}`}}>
                                {projectStaffList.name}
                              </div>
                        </div>
                      </div>
                    }
                  </div>:null
                }

              </div>

          <div className={styles.taskFilterSelect}>
                <div className={styles.taskFilterA} onClick={()=>{onFilterAction()}}>选择筛选项</div>
                <div className={styles.taskFilterReset} onClick={()=>{onReset()}}>重置</div>
                <div className={styles.taskFilterComplete} onClick={()=>{onCompleted()}}>完成</div>
          </div>

          </div>:null}


      </div>
    )
  }
}

export default TaskMenu;
