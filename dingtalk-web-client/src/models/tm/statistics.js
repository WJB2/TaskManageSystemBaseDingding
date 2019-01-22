import { routerRedux } from 'dva/router';
import moment from 'moment';

import ObjectUtils from './../../utils/ObjectUtils';
import taskService from "../../services/tm/TaskService";



export default {
  namespace: 'tm/statistics',

  state: {
    tabKey:'all',
    params:{
      beginTime:moment().startOf('month').format('YYYY-MM-DD HH:mm:ss.SSS'),
      endTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss.SSS'),
    },
    data:{
      list:[],
      pagination:{}
    }
  },

  effects: {
    *reportByAssignee({payload}, {put, select, call}){
      const params = yield select(state=>state['tm/statistics'].params);
      const pageInfo = yield call(taskService.reportTaskByAssignee, {...params, ...payload});

      for(let i=0; i<pageInfo.list.length; i++){
        pageInfo.list[i].rowNo = (pageInfo.pageNum-1)*pageInfo.pageSize + i+1;
      }

      yield put({
        type: 'mergeState',
        payload: {
          ...payload,
          params : {...payload},
          data : {
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
    },

    *reportByProject({payload}, {put, select, call}){

      const pageInfo = yield call(taskService.reportTaskByProject, payload);

      for(let i=0; i<pageInfo.list.length; i++){
        pageInfo.list[i].rowNo = (pageInfo.pageNum-1)*pageInfo.pageSize + i+1;
      }

      yield put({
        type: 'mergeState',
        payload: {
          ...payload,
          params : {...payload},
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
