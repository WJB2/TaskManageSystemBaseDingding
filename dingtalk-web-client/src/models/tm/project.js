import { routerRedux } from 'dva/router';

import ObjectUtils from './../../utils/ObjectUtils';
import projectService from "./../../services/tm/ProjectService";
import taskService from "../../services/tm/TaskService";

export default {
  namespace: 'tm/project',

  state: {
    formType: 'ADD',
    formVisible: false,
    currentProject: null,
    params: {},
    data: {
      list: [],
      pagination: {},
    },

    queryConditions:[],
    taskParams:{},
    taskData:{
      list:[],
      pagination: {}
    }
  },

  effects: {

    *addProjectAsync({ payload }, { call, put }) {
      yield call(projectService.addProject, payload);

      yield put({
        type: 'queryProjectPageAsync',
        payload:{}
      });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentProject: null,
        },
      });
    },

    *editProjectAction({ payload }, { call, put }) {
      const result = yield call(projectService.findProjectById, payload);

      yield put({
        type: 'mergeState',
        payload: {
          formType: 'EDIT',
          formVisible: true,
          currentProject: result,
        },
      });
    },

    *editProjectAsync({ payload }, { select, call, put }) {
      const currentProject = yield select(state => state['tm/project'].currentProject);

      yield call(projectService.editProject, { id: currentProject.id, ...payload });

      yield put({
        type: 'mergeState',
        payload: {
          formType: undefined,
          formVisible: false,
          currentProject: null,
        },
      });

      yield put({
        type: 'queryProjectPageAsync',
        payload:{},
      });
    },

    *deleteProjectByIdAsync({ payload }, { call, put }) {
      yield call(projectService.deleteProjectById, payload);

      yield put({
        type: 'queryProjectPageAsync',
      });
    },

    *viewTaskList({ payload }, { call, put }){
      yield put({
        type : 'global/componentChanged',
        payload : {
          path : '/project/task'
        }
      });

      yield put({
        type : 'tm/project/queryTaskPageAsync',
        payload : {
          projectId: payload.id
        }
      });
    },

    *queryProjectPageAsync({ payload }, { select, call, put }) {
      const params = yield select(state => state['tm/project'].params);
      const pageInfo = yield call(projectService.findProjectPage, {
        deletedFlag:false,
        ...params,
        ...payload,
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



    *queryTaskPageAsync({ payload }, { select, call, put }) {
      const taskParams = yield select(state => state['tm/project'].taskParams);
      const pageInfo = yield call(taskService.findTaskPage, {
        ...taskParams,
        ...payload,
        deletedFlag:false
      });

      pageInfo.list.forEach((item, index)=>{
        item.rowNo = index + 1 + (pageInfo.pageNum-1)*pageInfo.pageSize;
      });

      yield put({
        type: 'mergeState',
        payload: {
          taskParams : {...taskParams, ...payload},
          taskData: {
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
