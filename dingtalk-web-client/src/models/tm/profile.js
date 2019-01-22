import { routerRedux } from 'dva/router';

import ObjectUtils from './../../utils/ObjectUtils';
import taskService from "../../services/tm/TaskService";
import tagService from "../../services/tm/TagService";
import groupService from "../../services/tm/TaskGroupService";


export default {
  namespace: 'tm/profile',

  state: {
    tabKey : 'suspended',
    suspendedParams:{

    },
    archivedParams:{

    },
    data: {
      list: [],
      pagination: {},
    },

    taskTagFormVisible:false,
    taskTagFormType : 'ADD',
    currentTaskTag:null,
    taskTagType:null,
    tagList:[],

    taskGroupFormVisible:false,
    taskGroupFormType : 'ADD',
    currentTaskGroup:null,
    groupList:[],
  },

  effects: {
    *loadSuspended({payload}, {put, select, call}){

      const pageInfo = yield call(taskService.findTaskPage, {
        queryType : 'ASSIGNEE',
        suspended : true,
        sortBy : 'END_TIME_ASC'
      });

      yield put({
        type: 'mergeState',
        payload: {
          tabKey: 'suspended',
          suspendedParams : { ...payload},
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

    *loadArchived({payload}, {put, select, call}){
      const pageInfo = yield call(taskService.findTaskPage, {
        queryType : 'ASSIGNEE',
        archived : true,
        sortBy : 'END_TIME_ASC'
      });

      yield put({
        type: 'mergeState',
        payload: {
          tabKey: 'archived',
          archivedParams : { ...payload},
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

    *addTaskTagAsync({payload}, {put, select, call}){
      const {taskTagType} = yield select((state)=>state['tm/profile']);

      yield call(tagService.addTaskTag, {
        ...payload,
        tagType: taskTagType,
      });

      yield put({
        type : 'loadTagPageAsync',
        payload : {
          taskTagFormVisible:false,
          taskTagType:null,
        }
      });
    },

    *editTaskTagAction({payload}, {put, select, call}){
      const currentTaskTag = yield call(tagService.findTaskTagById, payload);

      yield put({
        type: 'updateState',
        payload:{
          currentTaskTag: currentTaskTag,
          taskTagFormVisible:true,
          taskTagFormType:'EDIT'
        }
      });
    },

    *editTaskTagAsync({payload}, {put, select, call}){

      yield call(tagService.editTaskTag, {
        ...payload,
      });

      yield put({
        type : 'loadTagPageAsync',
        payload : {
          taskTagFormType:null,
          taskTagFormVisible:false,
          taskTagType:null,
        }
      });
    },

    *deleteTaskTagAsync({payload}, {put, select, call}){
      yield call(tagService.deleteTaskTagById, {
        ...payload,
      });

      yield put({
        type : 'loadTagPageAsync',
        payload : {
          taskTagFormType:null,
          taskTagFormVisible:false,
          taskTagType:null,
        }
      });
    },

    *loadTagPageAsync({payload}, {put, select, call}){
      const list = yield call(tagService.findTaskTagList, {});

      yield put({
        type: 'mergeState',
        payload: {
          tabKey: 'tag',
          tagList: list,
          ...(payload?payload:{}),
        },
      });
    },


    *addTaskGroupAsync({payload}, {put, select, call}){

      yield call(groupService.addTaskGroup, payload);

      yield put({
        type : 'loadTaskGroupPageAsync',
        payload : {
          taskGroupFormVisible:false,
          taskGroupType:null,
        }
      });
    },

    *editTaskGroupAction({payload}, {put, select, call}){
      const currentTaskGroup = yield call(groupService.findTaskGroupById, payload);

      yield put({
        type: 'updateState',
        payload:{
          currentTaskGroup: currentTaskGroup,
          taskGroupFormVisible:true,
          taskGroupFormType:'EDIT'
        }
      });
    },

    *editTaskGroupAsync({payload}, {put, select, call}){

      yield call(groupService.editTaskGroup, {
        ...payload,
      });

      yield put({
        type : 'loadTaskGroupPageAsync',
        payload : {
          taskGroupFormType:null,
          taskGroupFormVisible:false,
        }
      });
    },

    *deleteTaskGroupAsync({payload}, {put, select, call}){
      yield call(groupService.deleteTaskGroupById, {
        ...payload,
      });

      yield put({
        type : 'loadTaskGroupPageAsync',
        payload : {
          taskGroupFormType:null,
          taskGroupFormVisible:false,
        }
      });
    },

    *loadTaskGroupPageAsync({payload}, {put, select, call}){
      const list = yield call(groupService.findTaskGroupList, {});

      yield put({
        type: 'mergeState',
        payload: {
          tabKey: 'group',
          groupList: list,
          ...(payload?payload:{}),
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
