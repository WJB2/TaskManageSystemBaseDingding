import { routerRedux } from 'dva/router';

import ObjectUtils from './../../utils/ObjectUtils';
import taskService from "../../services/tm/TaskService";
import taskOperateLogService from "../../services/tm/TaskOperateLogService";
import dingTalkStaffService from  '../../services/dingtalk/DingTalkStaffService';
import fileService from '../../services/system/FileService'
import DingTalkPC from "dingtalk-jsapi";
import moment from "moment";

export default {
  namespace: 'tm/task',

  state: {
    formType: 'ADD',
    formVisible: false,
    currentTask: null,
    currentProject:null,
    taskOperateLogList:null,
    subTaskList:[],
    groupEditVisible:false,
    params: {
      queryType:'ASSIGNEE',
    },
    queryConditions:[],
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * uploadImageFromPaste({ payload }, { call, put, select }){
      yield call(fileService.uploadImageFromPaste, payload)
    },
    *addTaskAsync({ payload }, { call, put, select }) {
      const globalModel = yield select((state)=>state['global']);
      const task = yield call(taskService.addTask, payload);

      yield put({
        type: 'queryProjectPageAsync',
        payload:{}
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentTask: task,
        },
      });

      const dingtalkUserIdList = yield call(dingTalkStaffService.convertStaffIdToDingtalkUserId, {
        staffId : task.assigneeIdList
      });

      DingTalkPC.biz.ding.post({
        users: dingtalkUserIdList,
        corpId:globalModel.corpId,
        type: 1,
        alertType:2,
        alertDate:{
          "format":"yyyy-MM-dd HH:mm",
          "value" : moment().format("YYYY-MM-DD HH:mm")
        },
        text: task.title,
        bizType : 0
      });
    },

    *editTaskAsync({ payload }, { call, put, select }) {
      const task = yield call(taskService.editTask, payload);

      yield put({
        type: 'queryProjectPageAsync',
        payload:{}
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentTask: task,
        },
      });

      yield put({
        type:'queryTaskPageAsync',
        payload:{}
      });
    },

    *addSubTaskAction({ payload }, { call, put, select }){
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

    *editTaskAction({ payload }, { call, put, select }){

      yield put({
        type: 'updateState',
        payload: {
          formVisible: true,
          formType: 'PREVIEW'
        }
      });

      const {position} = yield select(state=>state['global']);
      const task = yield call(taskService.findTaskById, payload);

      let editable = false;

      if(!task.completed &&
        ((task.assigneeIdList&&task.assigneeIdList.indexOf(position.staffId)>=0)
        ||(task.participatorIdList&&task.participatorIdList.indexOf(position.staffId)>=0))){
        editable=true;
      }

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : editable?'EDIT':'PREVIEW'
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

    *notificationTaskAsync({ payload }, { call, put }){

      yield call(taskService.notificationTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'EDIT',
          formVisible : true
        }
      });
    },

    *completeTaskAsync({ payload }, { call, put }){

      yield call(taskService.completeTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'PREVIEW',
          formVisible : true
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });

      yield put({
        type: 'tm/home/reloadAuditTasks',
        payload:{

        }
      });
    },

    *restartTaskAsync({ payload }, { call, put }){

      yield call(taskService.restartTaskById, payload);

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

      yield put({
        type: 'tm/home/reloadAuditTasks',
        payload:{

        }
      });
    },

    *markTaskUnreachableAsync({ payload }, { call, put }){
      yield call(taskService.markTaskUnreachableById, payload);

      yield put({
        type : 'editTaskAction',
        payload : {
          id:payload.taskId
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *markTaskReachableAsync({ payload }, { call, put }){
      yield call(taskService.markTaskReachableById, payload);

      yield put({
        type : 'editTaskAction',
        payload : {
          id:payload.taskId
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *suspendTaskAsync({ payload }, { call, put }){

      yield call(taskService.suspendTaskById, payload);

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

    *resumeTaskAsync({ payload }, { call, put }){

      yield call(taskService.resumeTaskById, payload);

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

      yield put({
        type: 'tm/home/reloadAuditTasks',
        payload:{

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

      yield put({
        type: 'tm/home/reloadAuditTasks',
        payload:{

        }
      });
    },

    *archiveTaskAsync({ payload }, { call, put }){

      yield call(taskService.archiveTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'PREVIEW',
          formVisible : true
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *unarchiveTaskAsync({ payload }, { call, put }){

      yield call(taskService.unarchiveTaskById, payload);

      const task = yield call(taskService.findTaskById, payload);

      yield put({
        type : 'updateState',
        payload : {
          currentTask : task,
          formType : 'PREVIEW',
          formVisible : true
        }
      });

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *deleteTaskAsync({ payload }, { call, put }){

      yield call(taskService.deleteTaskById, payload);

      yield put({
        type: 'queryTaskPageAsync',
        payload : {
          formVisible:false
        }
      });

      yield put({
        type : 'updateState',
        payload: {
          formVisible:false,
        }
      });
    },

    *commentTask({ payload }, { call, put }){
      yield call(taskService.commentTaskById, payload);

      const taskLogs = yield call(taskOperateLogService.findTaskOperateLogList, {
        taskId:payload.taskId
      });

      yield put({
        type: 'updateState',
        payload: {
          taskOperateLogList: taskLogs
        }
      });
    },

    *editTaskGroup({ payload }, { call, put }){
      yield call(taskService.editTaskGroupById, payload);

      yield put({
        type: 'queryTaskPageAsync',
        payload : {}
      });
    },

    *queryTaskPageAsync({ payload }, { select, call, put }) {
      const params = yield select(state => state['tm/task'].params);
      const pageInfo = yield call(taskService.findTaskPage, {
        ...params,
        ...payload,
        deletedFlag:false
      });

      pageInfo.list.forEach((item, index)=>{
        item.rowNo = index + 1 + (pageInfo.pageNum-1)*pageInfo.pageSize;
      });

      yield put({
        type: 'mergeState',
        payload: {
          params : {...params, ...payload},
          data: {
            list: pageInfo.list,
            pagination: {
              total: pageInfo.total,
              current: pageInfo.pageNum,
              pageSize: pageInfo.pageSize,
            },
          },
        },
      });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },

    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    },
  },

  subscriptions: {

  },
};
