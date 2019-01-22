import React,{PureComponent} from 'react';

import TabBarHandler from '../../components/main/TabBarHandler';
import ButtonHandler from '../../components/main/ButtonHandler';
import HeaderHandler from '../../components/main/HeaderHandler';
import FilterPane from '../../components/pane/FilterPane';

import TaskList from './TaskList';
import TaskMenu from './TaskMenu';

import { Popover,Modal,Toast,SearchBar } from 'antd-mobile';

import styles from './TaskIndex.less';

import { connect } from 'dva';

import DingTalkUtils from '../../utils/DingTalkUtils';

const Item=Popover.Item;
const alert=Modal.alert;

@connect(models=>({
  globalModel:models['global'],
  taskModel:models['task/task'],
}))
class TaskIndex extends React.Component{

  componentWillMount(){//页面初始化加载

    const {globalModel,dispatch}=this.props;

    dispatch({
       type:'task/task/queryTaskPageAsync',
       payload:{

       }
     })

    DingTalkUtils.disableBounce();

  }

  handleSkip(path){//点击标签栏

    const { dispatch }=this.props;

    dispatch({
      type:'global/forwardDestroy',
      payload:{
        path:path
      }
    })
  }

  addNewTaskHandler(){//增加任务

    const {dispatch} = this.props;

    dispatch({
      type : 'task/task/updateState',
      payload : {

        formVisible:true,
        formType:'ADD',
        currentTask:null,

      },
    })

  }

  editActionHandler(payload){//点击进入对应表单

    const {dispatch} = this.props;

    dispatch({
      type : 'task/task/editTaskAction',
      payload:{
        ...payload,
      },
    });
  }

  handlePageChange(e){//分页查询

    const { taskModel,dispatch }=this.props;
    dispatch({
      type:'task/task/queryTaskPageAsync',
      payload:{
        page:e,
      }
    })
  }

  handleRefreshAction(){//点击刷新
    const {dispatch}=this.props;
    Toast.loading('加载中',1,()=>{
      this.handleRefreshAsync()
    })
  }

  handleRefreshAsync(){//刷新
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/queryTaskPageAsync'
    })
  }

  handleFilterAction(){//点击菜单筛选项出现筛选面板
    const {dispatch}=this.props;

    dispatch({
      type:'task/task/updateState',
      payload:{
        filterPaneVisible:true,
      }
    })
  }

  handleFilterSubmit(values){//点击保存提交数据
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        filterPaneVisible:false,
        queryConditions:values
      }
    })
  }

  changeParams(params){//改变筛选参数

    const {dispatch} = this.props;

    dispatch({
      type : 'task/task/mergeState',
      payload : {
        params,
      },
    });
  }

  changeQueryConditions(values){//有哪些筛选条件
    const {dispatch, taskModel} = this.props;

    const {params} = taskModel;

    if(values.indexOf('beginTime')<0){
      delete params.beginTimeStart;
      delete params.beginTimeEnd;
    }

    dispatch({
      type : 'task/task/mergeState',
      payload : {
        queryConditions:values,
        params,
      },
    });
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

      if(item.title.indexOf(text)>=0){
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

  handleMenuHeader(whose){//点击菜单控制显隐

    const {dispatch,taskModel}=this.props;

    const { aboutMeIsClick,taskStatusIsClick,taskTimeIsClick,taskFilterIsClick }=taskModel;

    const clickArray=['aboutMeIsClick','taskStatusIsClick','taskTimeIsClick','taskFilterIsClick'];

    const clickFlag=whose+"IsClick";

    const clickArraynew=clickArray.filter((item,index)=>item!==clickFlag);

    console.log(clickArraynew)

    clickArraynew.map((item,index)=>{
      dispatch({
        type:'task/task/updateState',
        payload:{
          [item]:false,
        }
      })
    })

    dispatch({
      type:'task/task/updateState',
      payload:{
        [clickFlag]:!(taskModel[clickFlag]),
      }
    })

  }

  handleMenuItem(currentName,whose){//单击菜单项

    const {dispatch}=this.props;

    dispatch({
      type:'task/task/updateState',
      payload:{
        [whose+'CurrentName']:currentName,
        [whose+'IsClick']:false
      }
    })

  }

  searchTask(params){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/queryTaskPageAsync',
      payload:params,
    });
  }

  handleSearchAction(){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        isClickSearchIcon:true,
      }
    })
  }

  handleSearchFocus(){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        searchListText:"空空如也"
      }
    })

  }

  handleSearchCancel(){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        searchListText:null,
        isClickSearchIcon:false,
      }
    })
  }

  componentDidUpdate(e){

    const {dispatch,taskModel}=this.props;
    const {isClickSearchIcon}=taskModel;

    if(isClickSearchIcon){
      this.autoFocusInst.focus();
    }

  }

  handleFilterBack(){
    console.log('我被触发了');
    const {dispatch}=this.props;

    dispatch({
      type:'task/task/updateState',
      payload:{
        filterPaneVisible:false,
      }
    })
  }

  handleResetFilter(){//重置筛选项
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        queryConditions:['显示子任务'],
        params:{
          includeSubTask:true,
        },
        currentClickFilter:'显示子任务'
      }
    })
  }

  handleFilterItem(currentFilter){//点击筛选项
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        currentClickFilter:currentFilter
      }
    })
  }

  handleClickFilterSubTask(item){//点击子任务是或者否
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        whetherSubTask:item,
      }
    })
  }

  handleCompletedFilter(){
    const {dispatch}=this.props;
    dispatch({
      type:'task/task/updateState',
      payload:{
        taskFilterIsClick:false,
      }
    })
    this.searchTask({})
  }

  ChangeTask(values){
    const {dispatch}=this.props;
    if(values.length>0){
      dispatch({
        type:'task/task/updateState',
        payload:{
          searchListText:values,
        }
      })
    }else{
      dispatch({
        type:'task/task/updateState',
        payload:{
          searchListText:'不知所云'
        }
      })
    }


  }


  render(){
    const { taskModel }=this.props;

    const {
      formVisible,currentLoadingTabBar,formType,params,queryConditions,filterPaneVisible,taskList,searchListText,aboutMeCurrentName,taskStatusCurrentName,taskTimeCurrentName,
      aboutMeIsClick,taskStatusIsClick,taskTimeIsClick,isClickSearchIcon,taskFilterIsClick,currentClickFilter,
      whetherSubTask,
    }=taskModel;

    console.log(params);

    const paneConfig={
      queryConditions,
      onRefresh:this.handleRefreshAction.bind(this),
      onEdit:this.editActionHandler.bind(this),
      onPageChange:this.handlePageChange.bind(this),
      onParamsChange:this.changeParams.bind(this),
      onQueryConditionsChange:this.changeQueryConditions.bind(this),

    }

    taskList.forEach(item=>{
      item._pinyin = [PinyinHelper.getShortPinyin(item.title), PinyinHelper.convertToPinyinString(item.title, '',PinyinFormat.WITHOUT_TONE )];
    });

    const filterList=this.filterOption(taskList,searchListText);

    const listConfig={
      filterList,
      onEdit:this.editActionHandler.bind(this),
    }

    const menuConfig={
      aboutMeCurrentName,
      taskStatusCurrentName,
      taskTimeCurrentName,
      aboutMeIsClick,
      taskStatusIsClick,
      taskTimeIsClick,
      taskFilterIsClick,
      queryConditions,
      currentClickFilter,
      whetherSubTask,//是否显示子任务
      params,
      onHeader:this.handleMenuHeader.bind(this),
      onItem:this.handleMenuItem.bind(this),
      onSearch:this.searchTask.bind(this),
      onSearchIcon:this.handleSearchAction.bind(this),
      onFilterAction:this.handleFilterAction.bind(this),
      onReset:this.handleResetFilter.bind(this),
      onFilterItem:this.handleFilterItem.bind(this),
      onSelectSub:this.handleClickFilterSubTask.bind(this),
      onParamsChange:this.changeParams.bind(this),
      onCompleted:this.handleCompletedFilter.bind(this)
    }

    const headerConfig={
      leftTitle:"退出",
      centerTitle:'任务',
      rightVisible:false,
      onQuit:()=>{DingTalkUtils.closeBrower()}
    }

    return(
      <div className={styles.taskIndex}>

        <HeaderHandler {...headerConfig}/>

        {!isClickSearchIcon ? <TaskMenu {...menuConfig}/> :<div className={styles.search}><SearchBar ref={ref => this.autoFocusInst=ref}
                                                                                                      onFocus={()=>this.handleSearchFocus() }
                                                                                                      onCancel={(e)=>this.handleSearchCancel(e) }
                                                                                                      onChange={(e)=>this.ChangeTask(e)}/></div>}

        <div style={{position:'fixed',top:'1rem',color:'#8e9499',backgroundColor:'#fff',width:'100%',height:'1rem',boxSizing:'border-box',padding:'0.3rem 0.5rem',flexShrink:'0',flexGrow:'0',zIndex:'5'}} >共找到<span style={{color:'green'}}>{filterList.length}</span>个结果</div>

        <TaskList {...listConfig}/>

        <ButtonHandler color={"#5B88CB"} onAdd={this.addNewTaskHandler.bind(this)}  zIndex={10} />

        { filterPaneVisible && <FilterPane
                values={queryConditions}
                onSubmit={this.handleFilterSubmit.bind(this)}
                onBack={this.handleFilterBack.bind(this)}/> }

        <TabBarHandler value={'task'}
                       currentLoadingTabBar={currentLoadingTabBar}
                       handleSkip={this.handleSkip.bind(this)}/>

      </div>
    );
  }
}
export default TaskIndex;
