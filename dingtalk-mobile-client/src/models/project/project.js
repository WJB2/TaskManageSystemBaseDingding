import ObjectUtils from './../../utils/ObjectUtils';

import projectService from "../../services/project/ProjectService";
import taskService from "../../services/task/TaskService";

export default{
  namespace:'project/project',

  state:{
    currentLoadingTabBar:'tabBarMainList',
    currentLoadingTabs:'',//当前tabs
    buttonColor:'#FFA122',//项目初始按钮颜色
    searchListText:null,//项目搜索

    detailVisible:false,//详细项目是否可见
    formType:'ADD',//表单类型
    currentProject:null,//当前项目
    data:{
      list:[],
      pagination:{
      }
    },
    formVisible:false,
    archivedData:{
      list:[],
      pagination:{}
    },
    projectList:[],
  },

  effects:{
    *addProjectAsync({ payload }, { call, put }) {//增加项目

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

    *loadArchived({payload}, {put, select, call}){
      const pageInfo = yield call(taskService.findTaskPage, {
        archived : true,
      });

      yield put({
        type: 'mergeState',
        payload: {
          archivedData: {
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

    *editAction({ payload }, { call, put }) {//进入项目详情

      const result = yield call(projectService.findProjectById, payload);

      const currentTask=yield call(taskService.findTaskList,{projectId:result.id});

      yield put({
        type: 'mergeState',
        payload: {

          formType: null,
          currentProject: result,
          detailVisible:true,
          currentTask:currentTask,

        },
      });
    },

    *editProjectAction({payload},{call,put}){//进入项目编辑页

      const currentProject=yield call(projectService.findProjectById,{id:payload.id});

      yield put({
        type:'mergeState',
        payload:{
          formType:"EDIT",
          currentProject:currentProject,
          detailVisible:false,
          formVisible:true,
        }
      })
    },

    *editProjectAsync({ payload }, { select, call, put }) {//点击保存
      const currentProject = yield select(state => state['project/project'].currentProject);

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
        type:'mergeState',
        payload:{
          formType: undefined,
          formVisible: false,
          currentProject: null,
          detailVisible:false,
        }
      })

      yield put({
        type: 'queryProjectPageAsync',
        payload:{}
      });
    },

    *queryProjectPageAsync({ payload }, { select, call, put }){

      const pageInfo = yield call(projectService.findProjectList, {
        ...payload,
        deletedFlag:0,
      });


      yield put({
        type: 'mergeState',

        payload: {
          projectList:pageInfo,
          data: {
            list: pageInfo,
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
