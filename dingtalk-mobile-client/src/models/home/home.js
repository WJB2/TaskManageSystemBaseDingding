import ObjectUtils from './../../utils/ObjectUtils';

import taskService from '../../services/task/TaskService';
import taskOperateLogService from '../../services/task/TaskOperateLogService';

export default{
  namespace:'home/home',

  state:{
    currentLoadingTabBar:'tabBarMainList',
    taskCounts:0,
    bonusPoint:0,
    taskList:[],
    auditTaskList:[],
    queryParams : {

    },
    ownerTasks : {
      unbegin:0,
      underway:0,
      expired:0
    },
    assigneeTasks: {
      unbegin:0,
      underway:0,
      expired:0
    },
    supervisorTasks: {
      unbegin:0,
      underway:0,
      expired:0
    },
    participatorTasks: {
      unbegin:0,
      underway:0,
      expired:0
    },
  },

  effects:{

    *initData({payload}, {put, select, call}){

      const {queryParams} = yield select(state=>state['home/home'])

      const ownerTasks = yield call(taskService.countsOwnerTask, payload);

      const assigneeTasks = yield call(taskService.countsAssigneeTask, payload);

      const supervisorTasks = yield call(taskService.countsSupervisorTask, payload);

      const participatorTasks = yield call(taskService.countsParticipatorTask, payload);

      const taskCounts = yield  call(taskService.countStaffCompletedTask, payload);

      const bonusPoint = yield call(taskService.findStaffTaskBounsPoints, payload)

      const pageInfo = yield call(taskOperateLogService.findTaskOperateLogWithTaskList, {
        ...queryParams, ...payload
      });

      const auditTaskList = yield  call(taskService.findTaskList, {
        queryType: 'AUDITOR',
        status: 'COMPLETED',
        deletedFlag:false,
        sortBy:'CREATED_TIME_DESC'
      });

      yield put({
        type : 'mergeState',
        payload : {
          ownerTasks,
          assigneeTasks,
          supervisorTasks,
          taskCounts,
          bonusPoint,
          participatorTasks,
          auditTaskList,
          taskList: pageInfo.list,
          queryParams:payload
        }
      });
    },

    *refreshOperateLog({payload}, {put, select, call}){
      const {queryParams} = yield select(state=>state['home/home']);

      const pageInfo = yield call(taskOperateLogService.findTaskOperateLogWithTaskList, {
        ...queryParams, ...payload
      });

      yield put({
        type : 'mergeState',
        payload : {
            taskList: pageInfo.list,
            queryParams:payload
        }
      });
    },

    *reloadAuditTasks({payload}, {put, select, call}){
      const auditTaskList = yield  call(taskService.findTaskList, {
        queryType: 'AUDITOR',
        status: 'COMPLETED',
        deletedFlag:false,
        sortBy:'CREATED_TIME_DESC'
      });

      yield put({
        type: 'updateState',
        payload:{
          auditTaskList,
        }
      });
    },

    *viewTaskList({ payload }, { call, put }){

      yield put(routerRedux.push('/task'));

      yield put({
        type:'task/task/updateState',
        payload: {
          params: payload
        }
      });

      yield put({
        type : 'task/task/queryTaskPageAsync',
        payload : {
        }
      });
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

  }
}
