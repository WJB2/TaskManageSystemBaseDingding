import ObjectUtils from '../../utils/ObjectUtils';

import tagService from '../../services/tag/TagService';

export default{
  namespace:'tag/tag',

  state:{
    params:{},
    data: {
      list: [],
      pagination: {},
    },
  },

  effects:{

    *addTaskTagAsync({payload}, {put, select, call}){

      yield call(tagService.addTaskTag, {
        ...payload,
      });

      yield put({
        type : 'updateState',
        payload : {
          taskTagFormVisible:false,
          taskTagType:null,
        }
      });
    },

    *queryTagListAsync({ payload },{ select,call,put } ){

      const pageInfo=yield call(tagService.findTaskTagList,{
        ...payload,
      });


      yield put({
        type:'mergeState',
        payload:{
          data:{
            list:pageInfo,
          }
        }
      })

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
