import ObjectUtils from './../../utils/ObjectUtils';
import taskService from "../../services/task/TaskService";

export default{
  namespace:'statis/statis',

  state:{
    currentLoadingTabBar:'tabBarMainList',//当前标签栏显示
    staffVisible:false,//选人面板默认不显示
    tabBarVisible:true,//底部标签栏默认显示
    staffList:[],//选择的人员
    params:{

    },
    taskList:[],
    projectList:[],
    allHeader:[
      {name:'责任人/参与人',tabKey:'assignee'},
      {name:'未完成总数',tabKey:'incomplete'},
      {name:'未逾期',tabKey:'incompleteUnderway'},
      {name:'已逾期',tabKey:'incompleteExpired'},
      {name:'完成总数',tabKey:'completed'},
      {name:'提前完成',tabKey:'completedBefore'},
      {name:'逾期完成',tabKey:'completedAfter'},
      {name:'归档统计',tabKey:'archived'},
      {name:'所得积分',tabKey:'bonusPoints'},
      {name:'责任人积分',tabKey:'assigneeBonusPoints'},
      {name:'参与人积分',tabKey:'participatorBonusPoints'},
      {name:'创建人积分',tabKey:'ownerBonusPoints'}
    ],
    underWayHeader:[
      {name:'负责人',tabKey:'assignee'},
      {name:'未完成总数',tabKey:'incomplete'},
      {name:'未逾期',tabKey:'incompleteUnderway'},
      {name:'已逾期',tabKey:'incompleteExpired'}
    ],
    completedHeader:[
      {name:'责任人',tabKey:'assignee'},
      {name:'完成总数',tabKey:'completed'},
      {name:'提前完成',tabKey:'completedBefore'},
      {name:'逾期完成',tabKey:'completedAfter'}
    ],
    archivedHeader:[
      {name:'责任人',tabKey:'assignee'},
      {name:'归档统计',tabKey:'completed'},
      {name:'提前完成',tabKey:'completedBefore'},
      {name:'逾期完成',tabKey:'completedAfter'}
    ],
    projectHeader:[
      {name:'项目名称',tabKey:'project'},
      {name:'未完成总数',tabKey:'incomplete'},
      {name:'未逾期',tabKey:'incompleteUnderway'},
      {name:'已逾期',tabKey:'incompleteExpired'},
      {name:'完成总数',tabKey:'completed'},
      {name:'提前完成',tabKey:'completedBefore'},
      {name:'逾期完成',tabKey:'completedAfter'},
      {name:'归档统计',tabKey:'completed'},
    ]
  },

  effects:{

    *reportByAssignee({payload}, {put, select, call}){

      const params = yield select(state=>state['statis/statis'].params);

      console.log(payload);

      const pageInfo = yield call(taskService.reportTaskByAssignee, {...params, ...payload});

      yield put({
        type: 'mergeState',
        payload: {
          ...payload,
          params:{...payload},
          taskList:pageInfo.list,
        }
      });

    },

    *reportByProject({payload}, {put, select, call}){

      const pageInfo = yield call(taskService.reportTaskByProject, payload);

      yield put({
        type: 'mergeState',
        payload: {
          ...payload,
          params : {...payload},
          taskList:pageInfo.list
        },
      });
    }
  },

  reducers:{
    updateState(state,{payload}){
      return {...state,...payload};
    },
    mergeState(state, { payload }) {
      return ObjectUtils.mergeDeep(state, payload);
    }

  },

  subscriptions:{

  }
}
