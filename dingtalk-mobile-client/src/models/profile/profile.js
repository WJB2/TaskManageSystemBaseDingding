import ObjectUtils from '../../utils/ObjectUtils';

import taskService from '../../services/task/TaskService';
import tagService from "../../services/tag/TagService";
import groupService from "../../services/task/TaskGroupService";

export default{
  namespace:'profile/profile',

  state:{

    navBarTitle:'',//导航栏标题
    centerNavBarVisible:false,//中间标题是否可见
    endNavBarVisible:false,//尾部标签是否可见
    currentLoadingTabBar:'tabBarMainList',
    tagPaneVisible:false,
    taskSuspendedVisible:false,
    taskArchivedVisible:false,
    tabBarVisible:true,
    paneVisible:true,
    groupVisible:false,
    staffComponentDefault:'GREY',
    staffAddComponentVisible:false,//增加标签组件是否可见
    taskTagType:null,
    currentTaskTag:null,
    taskTagFormType:'ADD',
    params:{},
    data: {
      list: [],
      pagination: {},
    },
    suspendData:{
      list:[],
      pagination:{},
    },
    archivedData:{
      list:[],
      pagination:{}
    },

    groupList:[],
    taskGroupFormVisible:false,
    taskGroupFormType:'ADD',
    currentTaskGroup:null,
  },

  effects:{

    *loadSuspended({payload}, {put, select, call}){

      const pageInfo = yield call(taskService.findTaskList, {
        suspended : true,
      });

      console.log(pageInfo)

      yield put({
        type: 'mergeState',
        payload: {
          suspendData: {
            list: pageInfo,
            pagination: {
              total: pageInfo.total,
              current: pageInfo.pageNum,
              pageSize: pageInfo.pageSize,
            },
          },
        },
      });

      yield put({
        type:'mergeState',
        payload:{
          tabBarVisible:false,
          paneVisible:false,
          taskSuspendedVisible:true,
          taskArchivedVisible:false,
          tagPaneVisible:false,
        }
      })
    },


    *loadArchived({payload}, {put, select, call}){



      yield put({
        type:'mergeState',
        payload:{
          tabBarVisible:false,
          paneVisible:false,
          taskSuspendedVisible:false,
          taskArchivedVisible:true
        }
      })

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

    *addTaskTagAsync({payload}, {put, select, call}){//增加标签

      const {taskTagType} = yield select((state)=>state['profile/profile']);

      yield call(tagService.addTaskTag, {
        ...payload,
        tagType:'STAFF',
      });

      yield put({
        type:'updateState',
        payload:{
          staffAddComponentVisible:false,
          taskTagFormType:'ADD',
          currentTaskTag:null,
        }
      })

      yield put({
        type : 'loadTagPageAsync',
      });
    },

    *editTaskTagAction({payload}, {put, select, call}){//展示标签详细内容

      const currentTaskTag = yield call(tagService.findTaskTagById, payload);

      yield put({
        type: 'updateState',
        payload:{
          currentTaskTag: currentTaskTag,
          staffAddComponentVisible:true,
          taskTagFormType:'EDIT'
        }
      });
    },

    *editTaskTagAsync({payload}, {put, select, call}){

      yield call(tagService.editTaskTag, {
        ...payload,
      });

      yield put({
        type:'updateState',
        payload:({
          staffAddComponentVisible:false,
          taskTagFormType:null,
          currentTaskTag:null,
        })
      })

      yield put({
        type : 'loadTagPageAsync',
      });
    },

    *loadTagPageAsync({payload}, {put, select, call}){//加载标签列表

      const list = yield call(tagService.findTaskTagList, {});

      yield put({
        type: 'mergeState',
        payload: {
          data:{
            list:list,
          }
        },
      });
    },

    *deleteTaskTagAsync({payload}, {put, select, call}){
      yield call(tagService.deleteTaskTagById, {
        ...payload,
      });

      yield put({
        type:'updateState',
        payload:{
          staffAddComponentVisible:false,
          taskTagFormType:null,
          currentTaskTag:null,
        }
      })

      yield put({
        type : 'loadTagPageAsync',
      });
    },

    *addTaskGroupAsync({payload},{call,put,select}){

      yield call(groupService.addTaskGroup,payload);

      yield put({
        type:'loadTaskGroupPageAsync',
      })
      yield put({
        type:'mergeState',
        payload:{
          taskGroupFormVisible:false,
          taskGroupType:null,
          groupVisible:true,
          paneVisible:false,
        }
      })
    },

    *editTaskGroupAction({payload}, {put, select, call}){
      const currentTaskGroup = yield call(groupService.findTaskGroupById, payload);

      yield put({
        type: 'updateState',
        payload:{
          currentTaskGroup: currentTaskGroup,
          taskGroupFormVisible:true,
          groupVisible:false,
          taskGroupFormType:'EDIT'
        }
      });
    },

    *editTaskGroupAsync({payload}, {put, select, call}){

      yield call(groupService.editTaskGroup, {
        ...payload,
      });

      yield put({
        type:'mergeState',
        payload:{
          taskGroupFormVisible:false,
          taskGroupType:null,
          groupVisible:true
        }
      })

      yield put({
        type : 'loadTaskGroupPageAsync',
      });
    },

    *deleteTaskGroupAsync({payload}, {put, select, call}){
      yield call(groupService.deleteTaskGroupById, {
        ...payload,
      });

      yield put({
        type:'mergeState',
        payload:{
          taskGroupFormType:null,
          taskGroupFormVisible:false,
          groupVisible:true
        }
      })

      yield put({
        type : 'loadTaskGroupPageAsync',
      });
    },

    *loadTaskGroupPageAsync({payload},{put,select,call}){
      const list=yield call(groupService.findTaskGroupList,{});

      yield put({
        type:'mergeState',
        payload:{
          groupList:list,
        }
      })
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
