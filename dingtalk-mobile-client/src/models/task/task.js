import ObjectUtils from './../../utils/ObjectUtils';

import taskService from '../../services/task/TaskService';
import fileService from '../../services/system/FileService'
import taskOperateLogService from "../../services/task/TaskOperateLogService";
import dingTalkStaffService from "../../services/dingtalk/DingTalkStaffService";
import DingTalkMobile from 'dingtalk-jsapi';
import moment from 'moment';

export default{

  namespace:'task/task',

  state: {

    taskOperateLogList:null,//任务操作记录
    subTaskList:[],//子任务列表
    isEdit:false,
    taskList:[],//任务列表
    searchListText:null,//list搜索文字
    isClickSearchIcon:false,//是否点击搜索图标
    formType:'ADD',//表单类型
    currentTask:null,//当前任务,初始化任务为null
    formVisible:false,//表单是否显示
    params:{
      includeSubTask:true,
      sortBy:'CREATED_TIME_DESC',
      queryType:'OWNER',
    },
    queryConditions:['显示子任务'],
    currentClickFilter:'显示子任务',//当前点击的筛选项
    whetherSubTask:'是',//是否显示子任务
    filterPaneVisible:false,//筛选面板是否显示
    currentLoadingTabBar:'tabBarMainList',//标签栏应该展示

    completedBanner:false,//已完成条幅是否显示
    suspendBanner:false,//已挂起条幅是否显示
    archivedBanner:false,//已归档条幅是否显示

    aboutMeCurrentName:'我发起的',//关于我的菜单显示
    aboutMeIsClick:false,//默认第一个菜单没有被点击
    taskStatusCurrentName:'全部',//任务状态菜单显示
    taskStatusIsClick:false,//默认第二个菜单没有被点击
    taskTimeCurrentName:'创建时间(降序)',//任务时间菜单显示
    taskTimeIsClick:false,//默认第三个菜单没有被点击
    taskFilterIsClick:false,//默认筛选菜单没有被点击

    discussVisible:false,//跟进页面是否显示

  },
  effects:{

    *addTaskAsync({ payload }, { call, put, select }) {//增加任务

      const {currentTask}=yield select((state)=>state['task/task']);

      console.log(currentTask);

      const task=yield call(taskService.addTask, {
        ...payload,
        ...currentTask
      });

      console.log(task);

      yield put({
        type:'queryTaskPageAsync',
      })

      yield put({
        type: 'mergeState',
        payload: {
          formType: "EDIT",
          currentTask: task,
          isEdit:false,
        },
      });

      const dingtalkUserIdList = yield call(dingTalkStaffService.convertStaffIdToDingtalkUserId, {
        staffId : task.assigneeIdList
      });

      DingTalkMobile.biz.ding.post({
        users: dingtalkUserIdList,
        corpId:globalModel.corpId,
        type: 1,
        alertType:2,
        alertDate:{
          "format":"yyyy-MM-dd HH:mm",
          "value" : moment().format("YYYY-MM-DD HH:mm")
        },
        text: task.title,
        onFail:(e)=>{
          console.log(e);
          console.log('调用失败')
        }
      });

      yield put({
        type: 'queryProjectPageAsync',
      });

    },

    *editTaskAsync({ payload }, { call, put, select }) {//编辑任务
      const task=yield call(taskService.editTask, payload);

      yield put({
        type: 'queryProjectPageAsync',
        payload:{}
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: 'EDIT',
          currentTask: task,
          isEdit:false,
        },
      });

      yield put({
        type:'queryTaskPageAsync',
        payload:{}
      });
    },

    *addSubTaskAction({ payload }, { call, put, select }){//新建子任务
      yield put({
        type: 'updateState',
        payload: {
          formType: 'ADD',
          currentTask:{
            parentId: payload.id
          },
          taskOperateLogList:[]
        }
      });
    },

    *editTaskAction({ payload }, { select,call, put }){//列表点击进入对应列表

      let editable = false;

      const {position} = yield select(state=>state['global']);

      const task = yield call(taskService.findTaskById, payload);

      if(!task.completed && !task.archived ){
        editable = true;
      }

      console.log('经过了这里');

      yield put({
        type : 'updateState',
        payload : {
          ...payload,
          currentTask : task,
          formType : editable?'EDIT':'PREVIEW',
          formVisible:true,
          isEdit:false,
        }
      });

      const taskLogs = yield call(taskOperateLogService.findTaskOperateLogList, {
        taskId:task.id
      });

      yield put({
        type: 'updateState',
        payload: {
          taskOperateLogList: taskLogs,
        }
      });

      const subTaskList = yield call(taskService.findTaskList, {
        parentId:task.id
      });

      yield put({
        type: 'updateState',
        payload: {
          subTaskList: subTaskList,
        }
      });

    },

    *completeTaskAsync({payload},{put,call}){//任务完成

      yield call(taskService.completeTaskById,payload);

      const task=yield call(taskService.findTaskById,payload);

      yield put({
        type:'updateState',
        payload:{
          currentTask:task,
          formType:'PREVIEW',
          completedBanner:true,
        }
      })

    },

    *restartTaskAsync({payload},{call,put}){//任务重启

      yield call(taskService.restartTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'EDIT',
          completedBanner:false,

        }
      });
    },

    *archiveTaskAsync({ payload }, { call, put }){//任务归档

      yield call(taskService.archiveTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'PREVIEW',
          archivedBanner:true,
        }
      });

    },

    *unarchiveTaskAsync({ payload }, { call, put }){//任务回档

      yield call(taskService.unarchiveTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'PREVIEW',
          archivedBanner:false,
        }
      });


    },

    *suspendTaskAsync({payload},{call,put}){//任务挂起

      yield call(taskService.suspendTaskById,payload);

      const task=yield call(taskService.findTaskById,payload);

      yield put({
        type:'updateState',
        payload:{

          currentTask:task,
          formType:'PREVIEW',

        }
      })
    },

    *resumeTaskAsync({payload},{call,put}){//任务继续

      yield call(taskService.resumeTaskById,payload);

      const task=yield call(taskService.findTaskById,payload);

      yield put({
        type:'updateState',
        payload:{

          currentTask:task,
          formType:'EDIT',

        }
      })
    },

    *deleteTaskAsync({ payload }, { call, put }){//删除任务

      yield call(taskService.deleteTaskById, payload);

      yield put({
        type:'updateState',
        payload:{

          formVisible:false,
          formType:undefined,

        }
      })

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *notificationTaskAsync({ payload }, { call, put }){//催办

      yield call(taskService.notificationTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'EDIT',

        }
      });
    },

    *revokeAuditTaskAsync({ payload }, { call, put }){

      yield call(taskService.revokeAuditTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'EDIT',
          formVisible : true
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *queryTaskList({payload},{call,put,select}){

      const taskCounts=yield call(taskService.findTaskList,{
        ...payload
      });
      yield put({
        type:'mergeState',
        payload:{
          taskCounts:taskCounts,
        }
      })
    },

    *auditTaskAsync({ payload }, { call, put }){

      yield call(taskService.auditTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'EDIT',
          formVisible : true
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *queryTaskPageAsync({payload},{call,put,select}){

      const params=yield select(state=>state['task/task'].params);

      const pageInfo=yield call(taskService.findTaskList,{
        ...params,
        ...payload,
        deletedFlag:false,
        suspended:false,
      });

      yield put({
        type:'mergeState',
        payload:{
          params:{
            ...params,
            ...payload,
          },
          taskList:pageInfo,
        }
      })
    },

    *downloadFile({payload},{call,put,select}){
      console.log(payload);

      yield call(fileService.downloadFileById, payload);

    }

  },

  reducers:{
    updateState(state,{payload}){
      return {...state,...payload};
    },
    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },

  subscriptions:{
  },
}
