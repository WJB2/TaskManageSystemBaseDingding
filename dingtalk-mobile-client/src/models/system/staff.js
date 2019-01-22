import ObjectUtils from './../../utils/ObjectUtils';
import staffService from "../../services/system/StaffService";
export default{
  namespace:'system/staff',

  state:{
    staffselectorvisible:false,
    id:'',
    params:{},
    datas: {
      list: [],
      pagination: {},
    },
  },

  effects:{
    *queryStaffPageAsync({ payload }, { select, call, put }){

      const params = yield select(state => state['system/staff'].params);
      const pageInfo = yield call(staffService.findStaffPage, {
        ...params,
        ...payload,
      });

      yield put({

        type: 'mergeState',
        payload: {
          datas: {
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
