import ObjectUtils from "../../utils/ObjectUtils";
import taskService from "../../services/tm/TaskService";

export default {

  namespace: 'tm/bonusPoints',

  state : {
    params: {

    },
    queryConditions:[],
    data: {
      list: [],
      pagination: {},
    },
  },

  effects:{

    *saveBonusPointsAsync({ payload }, { select, call, put }){

      yield taskService.editTaskBonusPoints(payload);

      yield put({
        type : 'queryTaskPageAsync',
        payload : {}
      });
    },

    *queryTaskPageAsync({ payload }, { select, call, put }) {
      const params = yield select(state => state['tm/bonusPoints'].params);
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
}
