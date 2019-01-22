import { routerRedux } from 'dva/router';
import moment from 'moment';
import ObjectUtils from './../../utils/ObjectUtils';

import taskService from "./../../services/tm/TaskService";
import taskOperateLogService from "./../../services/tm/TaskOperateLogService";

export default {
  namespace: 'tm/home',

  state: {
    bonusPointsReport:{},
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
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *initData({payload}, {put, select, call}){

      const {queryParams} = yield select(state=>state['tm/home'])

      const ownerTasks = yield call(taskService.countsOwnerTask, payload);
      const participatorTasks = yield call(taskService.countsParticipatorTask, payload);
      const assigneeTasks = yield call(taskService.countsAssigneeTask, payload);
      const supervisorTasks = yield call(taskService.countsSupervisorTask, payload);
      const bonusPointsReport = yield call(taskService.findStaffTaskBounsPoints, {
        beginDate: moment().startOf('month').format("YYYY-MM-DD HH:mm:ss.SSS"),
        endDate : moment().endOf('month').format("YYYY-MM-DD HH:mm:ss.SSS"),
        ...payload})
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
          participatorTasks,
          bonusPointsReport,
          auditTaskList,
          data: {
            list: pageInfo.list,
            pagination: {
              total: pageInfo.total,
              current: pageInfo.pageNum,
              pageSize: pageInfo.pageSize,
            },
          },
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
        type:'tm/task/updateState',
        payload: {
          params: payload
        }
      });

      yield put({
        type : 'tm/task/queryTaskPageAsync',
        payload : {
        }
      });
    }
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
